import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createSession, processResponse, endSession, getSessionStatus } from './ai-interview-chatbot-v4.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5998;

// Start a new interview session
app.post('/api/interview/start', (req, res) => {
  try {
    const { jobTitle } = req.body;
    if (!jobTitle) {
      return res.status(400).json({ error: 'Job title is required' });
    }
    const session = createSession(jobTitle);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send a response and get the next question
app.post('/api/interview/respond', async (req, res) => {
  try {
    const { sessionId, response } = req.body;
    if (!sessionId || !response) {
      return res.status(400).json({ error: 'Session ID and response are required' });
    }
    const result = await processResponse(sessionId, response);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current session status
app.get('/api/interview/status/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const status = getSessionStatus(sessionId);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// End an interview session
app.post('/api/interview/end', (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    const result = endSession(sessionId);
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
