import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

// Initialize Google AI configuration
const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL_NAME;

// Create Google AI instance
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Process an interview interaction and return the next question
 * @param {string} jobTitle - The position being interviewed for
 * @param {Array} history - Array of previous interactions
 * @returns {Promise<string>} The AI's next question
 */
async function processInterviewInteraction(jobTitle, history = []) {
    // Configure AI to act as an interviewer
    const systemInstruction = `You are an interviewer for a ${jobTitle} position. After each response from the applicant, ask a relevant follow-up question. Do not analyze, give feedback, or provide any advice; simply ask a natural follow-up question based on the previous response. Do not include the following prefixes in your response: "[interviewer] " and "[applicant] ".`;
    
    const model = genAI.getGenerativeModel({ 
        model: modelName,
        systemInstruction: systemInstruction
    });

    // If this is the first interaction, start with an opening question
    if (history.length === 0) {
        history = [{
            role: "user",
            parts: [{ text: `I am applying for the ${jobTitle} position. Please start the interview with your first question.` }]
        }];
    }

    // Format history for the AI model
    const formattedHistory = history.map(msg => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: Array.isArray(msg.parts) ? msg.parts : [{ text: msg.parts }]
    }));

    // Send the history to the model to get the next question
    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessageStream(
        formattedHistory[formattedHistory.length - 1].parts[0].text
    );

    // Capture AI's follow-up question
    let aiResponse = "";
    for await (const chunk of result.stream) {
        aiResponse += chunk.text();
    }

    return aiResponse;
}

/**
 * Analyze the interview conversation and provide feedback
 * @param {string} jobTitle - The position being interviewed for
 * @param {Array} history - Array of previous interactions
 * @returns {Promise<string>} Analysis of the interview
 */
async function analyzeInterview(jobTitle, history = []) {
    // Configure AI to act as an interview analyst
    const systemInstruction = `You are an expert interview coach analyzing an interview for a ${jobTitle} position. 
    Review the conversation and provide constructive feedback on:
    1. The candidate's strengths and impressive points
    2. Areas for improvement
    3. Specific suggestions for better answers
    4. Overall communication style
    Be direct but encouraging, and provide specific examples from the conversation.`;
    
    const model = genAI.getGenerativeModel({ 
        model: modelName,
        systemInstruction: systemInstruction
    });

    // Format history for the AI model
    const formattedHistory = history.map(msg => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: Array.isArray(msg.parts) ? msg.parts : [{ text: msg.parts }]
    }));

    // Create analysis request
    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessageStream(
        "Please analyze this interview conversation and provide detailed feedback."
    );

    // Capture AI's analysis
    let aiResponse = "";
    for await (const chunk of result.stream) {
        aiResponse += chunk.text();
    }

    return aiResponse;
}

export { processInterviewInteraction, analyzeInterview };
