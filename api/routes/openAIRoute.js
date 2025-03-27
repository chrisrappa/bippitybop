import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { convertCsvBufferToText, removeSystemMessage } from '../helpers.js';
import fs from 'fs';
import multer from 'multer';
import DocUpload from '../models/uploadedDocModel.js';
import mongoose from 'mongoose';
import User from '../models/userModel.js';

const router = express();
dotenv.config();

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB limit
  },
});

const openai = new OpenAI({
  apiKey: `${process.env.OPEN_AI_ACCESS_KEY}`
});

// Middleware to handle raw text data
router.use(express.text({ type: 'text/event-stream' }));

router.post('/', async(req, res) => {
  const messages = req.body.messages;
  const justConversationMessages = removeSystemMessage(messages);
  const selectedVersion = req.body.selectedVersion;

  const useSelectedVersion = () => {
    switch(selectedVersion){
      case 'GPT 3.5':
        return 'gpt-3.5-turbo';
      case 'GPT 4':
        return 'gpt-4-turbo';
      case 'GPT 4o': 
        return 'gpt-4o';
      default: return 'gpt-3.5-turbo'
    };
  };

  // the coder assistant type is extremely general atm
  const stream = await openai.chat.completions.create({
    model: useSelectedVersion(),
    messages: [
      {
        role: 'system',
        content: 'You are Chat GPT, a helpful assistant. You responses are easily displayed with react-html-parser and easily edited with MDX Editor'
      },
      ...justConversationMessages
    ],
    stream: true,
  });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.flushHeaders(); // flush the headers to establish SSE

  try {
    for await (const payload of stream) {
      if (payload.choices[0].finish_reason) {
        res.end();
        return;
      }
      if (payload?.choices[0]?.delta?.content) {
        try {
          const text = payload.choices[0].delta?.content
          if (text) {
            res.write(`${text}`)
          }
        } catch (error) {
          console.error(`Error with JSON.parse and ${payload}.\n${error}`)
        }
      }
    }
  } catch (error) {
    console.error('Error streaming data:', error);
    res.write('event: error\n');
    res.write(`data: ${error.message}\n\n`);
    res.end();
  }
});

router.post('/personalAssistant', async(req, res) => {
  const message = req.body.message;
  const threadId = req.body.threadId;
  const assistantId = req.body.personalAssistantId;

  const messageFormatted = { role: "user", content: message };

  await openai.beta.threads.messages.create(threadId, messageFormatted);

  // Start streaming the assistant's responses
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // Flush the headers to establish SSE

  openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId
  })
  .on('textCreated', (text) => {
    if (text && !text?.value) {
      const content = text;
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    };
  })
  .on('textDelta', (textDelta, snapshot) => {
    if (textDelta.value) {
      res.write(`data: ${JSON.stringify({ content: textDelta.value })}\n\n`);
    }
  })
  .on('toolCallCreated', (toolCall) => {
    return process.stdout.write(`\nassistant > ${toolCall.type}\n\n`)
  })
  .on('toolCallDelta', (toolCallDelta, snapshot) => {
    if (toolCallDelta.type === 'code_interpreter') {
      if (toolCallDelta.code_interpreter.input) {
        process.stdout.write(toolCallDelta.code_interpreter.input);
      }
      if (toolCallDelta.code_interpreter.outputs) {
        process.stdout.write("\noutput >\n");
        toolCallDelta.code_interpreter.outputs.forEach(output => {
          if (output.type === "logs") {
            process.stdout.write(`\n${output.logs}\n`);
          }
        });
      }
    }
  })
  .on('end', () => {
    res.end();
  })
  .on('error', (error) => {
    console.error('Stream error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  });
});

router.post('/fileUpload', upload.array('files'), async (req, res) => {
  try {
    const { files } = req;
    const { ownerId } = req.body;

    const user = await User.findById(ownerId);
    const uploadedFiles = [];

    // Upload files to openAI and save data to DB (DocUpload collection)
    for (const file of files) {
      try {
        let fileBuffer = file.buffer;
        let fileContent = fileBuffer;
        let finalMimeType = file.mimetype;

        // Convert CSV files to text
        if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
          const textContent = await convertCsvBufferToText(fileBuffer);
          fileContent = Buffer.from(textContent);
          finalMimeType = 'text/plain';
        }

        // Create a temporary file path
        const tempFilePath = `/tmp/${file.originalname}${finalMimeType === 'text/plain' ? '.txt' : ''}`;
        await fs.promises.writeFile(tempFilePath, fileContent);

        const response = await openai.files.create({
          file: fs.createReadStream(tempFilePath),
          purpose: 'assistants'
        });

        // Clean up the temporary file
        await fs.promises.unlink(tempFilePath);

        const uploadedFileObj = new DocUpload({
          ownerId: ownerId,
          content: null,
          filename: file.originalname,
          folderId: null,
          gptFileId: response.id,
          collabChats: [],
          created_at: new Date().toISOString(),
          fileType: finalMimeType,
          fileSize: fileContent.length
        });

        const savedFile = await uploadedFileObj.save();
        uploadedFiles.push(savedFile);
      } catch (error) {
        console.error('Error uploading file to OpenAI:', error);
        throw error;
      }
    }

    // Extract file IDs from uploaded files
    const fileIds = uploadedFiles.map(file => file.gptFileId);

    if (user.assistantVectorId) {
      // Modify existing vector store with new files
      try {
        await openai.beta.vectorStores.fileBatches.create(
          user.assistantVectorId,
          {
            file_ids: fileIds
          }
        );

        res.status(200).send({
          vectorStoreId: user.assistantVectorId,
          uploadedFiles
        });
      } catch (error) {
        console.error('Error modifying vector store:', error);
        throw error;
      }
    } else {
      // Create new vector store
      try {
        const vectorStore = await openai.beta.vectorStores.create({
          name: `User_${ownerId}_VectorStore`,
          file_ids: fileIds
        });

        // Update user with new vector store ID
        await User.findByIdAndUpdate(ownerId, {
          assistantVectorId: vectorStore.id
        });

        res.status(200).send({
          vectorStoreId: vectorStore.id,
          uploadedFiles
        });
      } catch (error) {
        console.error('Error creating vector store:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error in file upload:', error);
    res.status(500).send({
      error: 'An error occurred while processing the files',
      details: error.message 
    });
  }
});

router.post('/createAssistant', async(req, res) => {
  const { vectorStoreId, userId } = req.body;

  const user = User.findById(userId);

  if(!user){
    res.status(404).send({ error: "No user found" });
  };

  try{
    const myAssistantData = await openai.beta.assistants.create({
      instructions:
        "You are a helpful personal assistant that uses the files provided to you to answer questions and explain ideas related to the information in any and all the data you have from those files and are relevant. You also improve you responses based upon data in provided files.",
      name: `User: ${userId} Personal Assistant`,
      tools: [{ type: "file_search" }],
      tool_resources: {
        file_search: {
          vector_store_ids: [`${vectorStoreId}`]
        }
      },
      model: "gpt-4o",
    });

    // ALERT: Create thread here, might need to refactor to create multiple threads, not sure
    // ALERT: Not sure if you need to have multiple runs called
    const createThread = await openai.beta.threads.create();
    const assistantThreadId = createThread?.id;

    if(assistantThreadId){
      await openai.beta.threads.runs.create(
        assistantThreadId,
        {
          assistant_id: `${myAssistantData?.id}`,
          stream: true
        }
      );
    };

    await User.findByIdAndUpdate(userId, {
      assistantThreadId: assistantThreadId,
      personalAssistantId: myAssistantData?.id
    });

    res.status(200).send({ 
      personalAssistantId: myAssistantData?.id,  
      assistantThreadId: assistantThreadId
    });
  } catch (error) {
    console.error('error', error);
    res.status(400).send({ error: error.message });
  }
});

router.post('/deleteFile', async(req, res) => {
  const { gptFileId } = req.body;

  try{  
    const deletedFile = await openai.files.del(gptFileId);

    if(deletedFile?.deleted){
      res.status(200).send({ deletedFile })
    };
  } catch (error) {
    res.status(400).send({ error: error.message });
  };
});

router.post('/deleteAssistants', async(req, res) => {

  const myAssistants = await openai.beta.assistants.list({
    limit: '100'
  });
  const assistantIds = myAssistants?.data?.map((assistant) => assistant?.id);

  assistantIds?.map(async(id) => {
    const response = await openai.beta.assistants.del(id);
  })
});

export default router;