import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { removeSystemMessage } from '../helpers.js';

const router = express();
dotenv.config();

const openai = new OpenAI({
  apiKey: `${process.env.GROK_API_KEY}`,
  baseURL: "https://api.x.ai/v1"
});

// Middleware to handle raw text data
router.use(express.text({ type: 'text/event-stream' }));

router.post('/', async(req, res) => {
  const messages = req.body.messages;
  const justConversationMessages = removeSystemMessage(messages);

  const stream = await openai.chat.completions.create({
    model: 'grok-beta',
    messages: [
      {
        role: 'system',
        content: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy."
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
})

export default router;