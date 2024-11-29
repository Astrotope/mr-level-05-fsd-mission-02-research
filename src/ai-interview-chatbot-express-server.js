/**
 * AI Interview Chatbot Express Server Module
 * This module implements a job interview simulation using Google's Generative AI.
 * It manages multiple interview sessions and provides API endpoints for interaction.
 */

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

// Initialize Google AI configuration
const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL_NAME;

// Create Google AI instance
const genAI = new GoogleGenerativeAI(apiKey);

// Global session storage using Map for O(1) lookup
const sessions = new Map();

/**
 * InterviewSession Class
 * Manages a single interview session, including:
 * - Chat history
 * - Round tracking
 * - AI model interaction
 */
class InterviewSession {
  constructor(jobTitle) {
    this.jobTitle = jobTitle;
    this.currentRound = 0;
    this.maxRounds = 6;
    // Configure AI to act as an interviewer for the specific job
    this.systemInstruction = `You are an interviewer for a ${jobTitle} position. After each response from the applicant, ask a relevant follow-up question. Do not analyze, give feedback, or provide any advice; simply ask a natural follow-up question based on the previous response. Do not include the following prefixes in your response: "[interviewer] " and "[applicant] ".`;
    this.model = genAI.getGenerativeModel({ model: modelName, systemInstruction: this.systemInstruction });
    // Initialize chat history with the opening context
    this.history = [
      {
        role: "user",
        parts: [{ text: `I am preparing for a ${jobTitle} job interview. Can you help me practice?` }],
      },
      {
        role: "model",
        parts: [{ text: "Tell me about yourself." }],
      },
    ];
  }

  /**
   * Process user's response and generate next interview question
   * @param {string} userResponse - The user's answer to the previous question
   * @returns {Object} Response object containing next question or completion message
   */
  async processResponse(userResponse) {
    // Check if interview is complete
    if (this.currentRound >= this.maxRounds) {
      return { 
        done: true, 
        message: "Interview session complete. Thank you for practicing!" 
      };
    }

    // Add user's response to chat history
    this.history.push({
      role: "user",
      parts: [{ text: `[applicant] ${userResponse}` }],
    });

    // Format history for API consumption
    const formattedHistory = this.history.map((message) => ({
      role: message.role,
      parts: message.parts.map((part) => {
        if (typeof part === 'string') {
          return { text: part };
        }
        return part;
      }),
    }));

    // Send the updated history to the model to get the next question
    const chat = this.model.startChat({ history: formattedHistory });

    // Send request to AI model
    const result = await chat.sendMessageStream({
      messages: formattedHistory,
    }.toString());

    // Capture AI's follow-up question
    let aiResponse = "";
    for await (const chunk of result.stream) {
      aiResponse += chunk.text();
    }

    // Clean up AI response
    aiResponse = aiResponse.trim();

    // Format response with interviewer prefix
    const interviewerResponse = `[interviewer] ${aiResponse}`;
    
    // Update chat history with AI's question
    this.history.push({
      role: "model",
      parts: [{ text: interviewerResponse }],
    });

    // Increment round counter
    this.currentRound++;

    // Return formatted response
    return {
      done: false,
      message: interviewerResponse,
      round: this.currentRound
    };
  }
}

/**
 * Create new interview session
 * @param {string} jobTitle - The position being interviewed for
 * @returns {Object} Session details including ID and first question
 */
export function createSession(jobTitle) {
  const sessionId = Date.now().toString();
  const session = new InterviewSession(jobTitle);
  sessions.set(sessionId, session);
  return {
    sessionId,
    firstQuestion: "Tell me about yourself."
  };
}

/**
 * Process user response in existing session
 * @param {string} sessionId - The session identifier
 * @param {string} response - User's response to previous question
 * @returns {Promise<Object>} Next question or completion message
 * @throws {Error} If session not found
 */
export async function processResponse(sessionId, response) {
  const session = sessions.get(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }
  return await session.processResponse(response);
}

/**
 * End an interview session
 * @param {string} sessionId - The session to end
 * @returns {boolean} True if session was successfully removed
 */
export function endSession(sessionId) {
  return sessions.delete(sessionId);
}

/**
 * Get current status of an interview session
 * @param {string} sessionId - The session to check
 * @returns {Object} Session status including progress and completion
 * @throws {Error} If session not found
 */
export function getSessionStatus(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }
  return {
    jobTitle: session.jobTitle,
    currentRound: session.currentRound,
    maxRounds: session.maxRounds,
    isComplete: session.currentRound >= session.maxRounds
  };
}