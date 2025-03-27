import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { removeSystemMessage } from '../helpers.js';

const router = express.Router();
dotenv.config();

router.use(express.json());

router.post('/', async (req, res) => {
  const messages = req.body.messages;
  const justConversationMessages = removeSystemMessage(messages);

  // Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.perplexity.ai/chat/completions',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'You are Perplexity, a helpful assistant that uses websearch to get the best most up to date information.'
          },
          ...justConversationMessages
        ],
        stream: true
      },
      responseType: 'stream'
    });

    let buffer = '';

    response.data.on('data', (chunk) => {
      buffer += chunk.toString();
      
      // Try to parse complete JSON objects
      let boundary = buffer.lastIndexOf('\n');
      if (boundary !== -1) {
        let completeData = buffer.substring(0, boundary);
        buffer = buffer.substring(boundary + 1);
        
        completeData.split('\n').forEach(line => {
          if (line.trim().startsWith('data: ')) {
            try {
              const jsonData = JSON.parse(line.replace('data: ', ''));
              if (jsonData.choices && jsonData.choices[0].delta.content) {
                res.write(`${jsonData.choices[0].delta.content}`);
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          }
        });
      }
    });

    response.data.on('end', () => {
      res.end();
    });

  } catch (error) {
    console.error('Error streaming data:', error);
    res.write(`data: Error: ${error.message}\n\n`);
    res.end();
  }
});

export default router;