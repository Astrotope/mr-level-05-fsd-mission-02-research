import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL_NAME;

const jobTitle = "Software Engineer";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: modelName });

// Initialize chat history manually to avoid undefined errors
const history = [
  {
    role: "user",
    parts: [
      {
        text: `I am preparing for a ${jobTitle} job interview. Can you help me practice?`,
      },
    ],
  },
  {
    role: "model",
    parts: [{ text: "[interviewer] Tell me about yourself." }],
  },
];

async function getUserInput() {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    stdin.resume();
    stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });
}

async function interviewChat() {
  console.log("[interviewer] Tell me about yourself.");

  const rounds = 6;
  for (let i = 1; i <= rounds; i++) {
    // Prompt user for their response
    process.stdout.write("\n[applicant] ");
    const userResponse = await getUserInput();

    // Append user's response to the chat history
    history.push({
      role: "user",
      parts: [{ text: `[applicant] ${userResponse}` }],
    });

    // Send user's response along with the full history
    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(userResponse);

    // Capture AI's response
    let aiResponse = "";
    for await (const chunk of result.stream) {
      aiResponse += chunk.text();
    }

    // Append AI's response to the history
    const interviewerResponse = `[interviewer] ${aiResponse}`;
    history.push({
      role: "model",
      parts: [{ text: interviewerResponse }],
    });

    // Display AI's question
    console.log(interviewerResponse);
  }
}

// Start the interview chat loop
interviewChat().catch((err) => console.error("Error:", err));
