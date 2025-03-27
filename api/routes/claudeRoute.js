import express from 'express';
import * as dotenv from 'dotenv';
import Anthropic from "@anthropic-ai/sdk";
import { removeSystemMessage } from '../helpers.js';

const anthropic = new Anthropic();
const router = express();
dotenv.config();

// Use JSON middleware instead of text middleware
router.use(express.json());

router.post('/', async (req, res) => {
  try {
    const messages = req.body.messages || [];
    const justConversationMessages = removeSystemMessage(messages);

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Create the message stream
    const stream = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      temperature: 0,
      system: "You are Claude, a helpful A.I. assistant that is especially helpful with copy-writing and coding.",
      messages: justConversationMessages.length > 0 ? justConversationMessages : [
        {
          "role": "user",
          "content": "Why is the ocean salty?"
        }
      ],
      stream: true
    });

    // Handle the stream
    for await (const chunk of stream) {
      // Check if the stream has ended
      if (chunk.type === 'message_stop') {
        res.end();
        return;
      }

      // Send the text content
      if (chunk.type === 'content_block_delta' && chunk.delta?.text) {
        res.write(chunk.delta.text);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

export default router;