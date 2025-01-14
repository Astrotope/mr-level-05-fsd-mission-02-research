# Google Gemini - AI Interview Chatbot Design
<a id="readme-top"></a>

[Click ⏵ to Expand TOC]
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#google-gemini-api-test">Google Gemini API Test with cURL</a></li>
    <li><a href="#gemini-sdk-test-generation">Google AI SDK - Text Generation Test</a></li>
    <li><a href="#google-ai-sdk-text-streaming">Google AI SDK - Text Streaming Test</a></li>
    <li><a href="#ai-interview-chatbot-terminal">Design AI Job Interview Practice Chatbot (Terminal) - Version 01</a></li>
    <li><a href="#ai-interview-chatbot-terminal-02">Design AI Job Interview Practice Chatbot (Terminal) - Version 02</a></li>
    <li><a href="#ai-interview-chatbot-api-stateful-endpoints">Create Stateful API Endpoints for the AI Interview Practice Chatbot using express.js</a></li>
    <li><a href="#review-ai-api-stateful-endpoints">Review of Stateful Chatbot API</a></li>
    <li><a href="#ai-api-stateless-rest-endpoints">AI Interview Chatbot API - Stateless (REST)</a></li>
    <li><a href="#ai-practice-interview-chatbot-frontend">AI Practice Interview Chatbot - Frontend Design</a></li>
    <li><a href="#gemini-1-5-flash-8b-model-spec">Gemini 1.5 Flash-8B is a small model designed for lower intelligence tasks. Fastest model (ideal for chat)</a></li>
    <li><a href="#tdd-plan">Test Driven Development Plan</a></li>
    <li><a href="#gemini-sdk-notes">Gemini Chat SDK - Key Things to Know</a></li>
  </ol>
</details>

---
<a id="google-gemini-api-test"></a>
## (1) Google Gemini API Test with cURL

### Test 

```bash
curl \
  -H "Content-Type: application/json" \
  -d "{\"contents\":[{\"parts\":[{\"text\":\"Explain how AI works\"}]}]}" \
  -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=[MY_API_KEY]"
```

### Results

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "AI, or Artificial Intelligence, doesn't work in a single, unified way.  Instead, it encompasses a broad range of techniques and approaches, all aiming to create systems that can perform tasks that typically require human intelligence.  Here's a breakdown of some key concepts:\n\n**1. Data is King:**  At the heart of most AI systems lies vast amounts of data. This data is used to train the AI, allowing it to learn patterns, relationships, and make predictions.  The more relevant and high-quality data, the better the AI will perform.\n\n**2. Algorithms are the Engine:** Algorithms are sets of rules and calculations that the AI uses to process data and learn.  Different types of AI use different algorithms:\n\n* **Machine Learning (ML):**  Instead of being explicitly programmed, ML algorithms learn from data.  They identify patterns and build models that allow them to make predictions or decisions on new, unseen data.  There are various types of ML, including:\n    * **Supervised Learning:** The algorithm is trained on labeled data (data with known inputs and outputs).  The goal is to learn a mapping between inputs and outputs.  Examples include image classification (labeling images as \"cat\" or \"dog\") and spam detection.\n    * **Unsupervised Learning:** The algorithm is trained on unlabeled data.  The goal is to discover hidden patterns and structures in the data.  Examples include clustering (grouping similar data points together) and dimensionality reduction.\n    * **Reinforcement Learning:** The algorithm learns through trial and error, receiving rewards or penalties for its actions.  The goal is to learn a policy that maximizes cumulative rewards.  Examples include game playing (e.g., AlphaGo) and robotics.\n\n* **Deep Learning (DL):** A subfield of ML that uses artificial neural networks with multiple layers (hence \"deep\").  These networks can learn very complex patterns from vast amounts of data, achieving state-of-the-art results in areas like image recognition, natural language processing, and speech recognition.\n\n**3. Neural Networks Mimic the Brain (Loosely):** Inspired by the structure and function of the human brain, neural networks consist of interconnected nodes (neurons) that process and transmit information.  They learn by adjusting the connections between these nodes based on the data they are trained on.\n\n**4.  Natural Language Processing (NLP):**  Focuses on enabling computers to understand, interpret, and generate human language.  This is crucial for applications like chatbots, machine translation, and sentiment analysis.\n\n**5. Computer Vision:**  Enables computers to \"see\" and interpret images and videos.  This is used in applications like self-driving cars, facial recognition, and medical image analysis.\n\n\n**In Simple Terms:** Imagine teaching a dog a trick.  You show it what to do (data), reward it when it does it correctly (reinforcement learning), and correct it when it's wrong.  Over time, the dog learns the trick.  AI works similarly, but instead of a dog, it's an algorithm, and instead of treats, it's adjustments to its internal parameters.\n\n\nIt's important to remember that AI is a constantly evolving field.  New techniques and approaches are constantly being developed, pushing the boundaries of what's possible.  While AI can be incredibly powerful, it's also important to understand its limitations and potential biases, which are often inherited from the data it's trained on.\n"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "citationMetadata": {
        "citationSources": [
          {
            "startIndex": 2096,
            "endIndex": 2249,
            "uri": "https://net-informations.com/ai/intro/found.htm"
          },
          {
            "startIndex": 2359,
            "endIndex": 2489,
            "uri": "https://www.studocu.com/in/document/delhi-technological-university/computer-science/ai-one-shot-very-beautiful-notes/83699387"
          },
          {
            "startIndex": 2388,
            "endIndex": 2521,
            "uri": "https://koala-mackerel-8g2h.squarespace.com/blog/whatisai"
          }
        ]
      },
      "avgLogprobs": -0.1534058586668573
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 4,
    "candidatesTokenCount": 724,
    "totalTokenCount": 728
  },
  "modelVersion": "gemini-1.5-flash-latest"
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="gemini-sdk-test-generation"></a>
## (2) Google AI (Node.js) SDK - Text Generation Test


### Setup 

```bash
mkdir mission-03-research 
cd mission-03-research
git clone https://github.com/Astrotope/mr-level-05-fsd-mission-03-research.git
cd mr-level-05-fsd-mission-03-research
npm install
[add your google-ai as GEMINI_API_KEY to .env]
[set the name of the google-ai model you wish to use in .env as GEMINI_MODEL_NAME. Choose a model that will accept text, and return text.]
```

### Run

```bash
node ./src/text-generation.js
```

### Code: text-generation.js

```javascript
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL_NAME;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: modelName });

const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());
```

---

### Configuraition: package.json needs ' "type": "module", ' added.

```json
{
  "name": "ai_job_interviewer",
  "version": "0.0.1",
  "description": "Application to provide practice job interviews, using generative AI.",
  "main": "ai-interview.js",
  "type": "module",
  "scripts": {
    "test": "jest"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Astrotope/mr-level-05-fsd-mission-03-research.git"
  },
  "keywords": [
    "ai",
    "interview",
    "job",
    "practice",
    "developer",
    "job",
    "transition",
    "change",
    "management"
  ],
  "author": "Cameron McEwing",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Astrotope/mr-level-05-fsd-mission-03-research/issues"
  },
  "homepage": "https://github.com/Astrotope/mr-level-05-fsd-mission-03-research#readme",
  "devDependencies": {
    "jest": "^29.7.0"
  },
  "dependencies": {
    "@google/generative-ai": "^0.21.0"
  }
}
```
---

## Run:

```bash
node ./src/text-generation.js   
```

---
                                                                                                                                                                               
AI works by combining large amounts of data with fast, iterative processing and intelligent algorithms, allowing the software to learn automatically from patterns or features in the data.  There's no single "how it works" because different AI approaches use different techniques, but here's a breakdown of key concepts:

**1. Data is Key:** AI systems learn from data.  The more data, generally the better the performance, though the quality of the data is crucial. This data can be structured (like tables in a database) or unstructured (like text, images, or audio).

**2. Algorithms are the Brains:** These are sets of rules and statistical techniques that allow the AI to analyze data, identify patterns, and make predictions or decisions.  Different algorithms are suited to different tasks.  Some common types include:

* **Machine Learning (ML):** This is a broad category where algorithms learn from data without explicit programming.  Examples include:
    * **Supervised Learning:** The algorithm is trained on labeled data (data with known outputs).  For example, showing an AI many pictures of cats labeled "cat" and dogs labeled "dog" so it can learn to distinguish between them.
    * **Unsupervised Learning:** The algorithm learns from unlabeled data, identifying patterns and structures on its own.  For example, clustering similar customers together based on their purchase history.
    * **Reinforcement Learning:** The algorithm learns through trial and error, receiving rewards for correct actions and penalties for incorrect ones.  This is often used in robotics and game playing.

* **Deep Learning (DL):** A subset of machine learning that uses artificial neural networks with multiple layers (hence "deep"). These networks are inspired by the structure and function of the human brain and are particularly good at processing complex, unstructured data like images and speech.  Examples include convolutional neural networks (CNNs) for image recognition and recurrent neural networks (RNNs) for natural language processing.

* **Natural Language Processing (NLP):** This focuses on enabling computers to understand, interpret, and generate human language.  It's used in chatbots, machine translation, and sentiment analysis.

* **Computer Vision:** This allows computers to "see" and interpret images and videos.  It's used in self-driving cars, facial recognition, and medical image analysis.


**3. Processing Power:**  Training complex AI models requires significant computing power, often using specialized hardware like GPUs (graphics processing units) and TPUs (tensor processing units).


**4. Iterative Process:** AI development is an iterative process.  Models are trained, tested, and refined based on their performance. This involves adjusting parameters of the algorithms, adding more data, or even changing the algorithm entirely.


**5.  Output:** The final output of an AI system depends on its purpose.  It could be a prediction (e.g., the probability of rain tomorrow), a classification (e.g., identifying an object in an image), a decision (e.g., choosing the best move in a game), or a generated output (e.g., a translation of text).


In short, AI works by using algorithms to find patterns in data, allowing it to learn and make predictions or decisions without explicit programming for every scenario. The complexity and sophistication vary greatly depending on the specific AI system and its application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="google-ai-sdk-text-streaming"></a>
## (3) Google (Node.js) AI SDK - Text streaming 

### Code: text-stream.js

```javascript
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL_NAME;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: modelName });

const prompt = "Write a story about a magic backpack.";

const result = await model.generateContentStream(prompt);

// Print text as it comes in.
for await (const chunk of result.stream) {
  const chunkText = chunk.text();
  process.stdout.write(chunkText);
}
```
### Configuration: .env

```text
GEMINI_API_KEY="[MY_API_KEY]"
GEMINI_MODEL_NAME="gemini-1.5-flash"
```

### Run:

```bash
node src/text-stream.js
```

Elara wasn't looking for a magic backpack. She was looking for a way to escape her suffocatingly ordinary life in the town of Dustbowl.  Dustbowl, true to its name, offered only dust, despair, and the monotonous chime of the town clock.  So, when she stumbled upon a dusty old rucksack in her grandmother's attic, it was merely a potential escape route from the boredom, not a portal to adventure.

The backpack was unremarkable, woven from coarse brown fabric, its leather straps worn thin.  But the moment Elara slung it over her shoulders, a strange warmth bloomed in her chest.  She glanced inside – completely empty.  Yet, a whisper, faint as a sigh, seemed to emanate from the bag itself: "Where to?"

Confused but curious, Elara muttered, "The Whispering Woods." The Whispering Woods, a legendary place just beyond Dustbowl, filled with stories of mischievous sprites and hidden waterfalls, was forbidden territory.

Instantly, the backpack felt heavier.  Elara gasped as she felt the contents shift.  Reaching in, she pulled out a gleaming silver compass, its needle spinning wildly before settling firmly on a specific direction.  Then, a map materialized, its parchment crisp and new, detailing a path through the Woods, marked with symbols she instinctively understood.  Finally, a small, intricately carved wooden flute appeared.

Following the map and compass, Elara ventured into the Whispering Woods.  The flute, played softly, calmed the chattering sprites and opened paths through thorny thickets.  The backpack itself seemed to anticipate her needs.  When she was thirsty, a flask of cool, clear water appeared. When she was hungry, a loaf of warm bread and a wedge of cheese materialized.  Once, when a grumpy badger blocked her path, a small, perfectly ripe strawberry appeared, instantly appeasing the creature.

The deeper she went, the more magical the woods became.  She saw waterfalls cascading into crystal-clear pools, met shy pixies with wings like stained glass, and even danced with a mischievous satyr who taught her the secrets of the forest.  Each time she needed something – a rope to cross a chasm, a lantern to light her way – it appeared in the backpack as if by magic.

Days later, she emerged from the woods, changed.  The dull ache of boredom was gone, replaced by a sense of wonder and confidence.  She returned to Dustbowl, the magic of the woods lingering in her heart and the backpack at her side.

The backpack never revealed the source of its magic, but it continued to provide for her, offering not only practical items but also opportunities.  It helped her find a hidden talent for sculpting, provided her with the tools she needed to create stunning works of art, and even facilitated a scholarship to an art school far away from Dustbowl.

Elara never forgot the dusty attic, the unremarkable backpack, and the whispering woods.  They reminded her that even the most ordinary lives could contain extraordinary magic, if only you were brave enough to ask for it. And, perhaps most importantly, that sometimes, the best escapes are the ones you find in the most unexpected places.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="ai-interview-chatbot-terminal"></a>
## (4) Design AI Job Interview Practice Chatbot (Terminal) - Version 01

### Code: ai-interview-chatbot.js

```javascript
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
```

### Run: 

(This chatbot was a little chatty, it didn't limit itself to follow-up questions. It provided an analysis of the applicants response, with suggestions of how to improve it. I didn't give sufficient guidence on what output I was expecting.)

```bash
node src/ai-interview-chatbot.js
```

[interviewer] Tell me about yourself.

[applicant] Hello
[interviewer] Okay, let's proceed with the interview.  The question was "Tell me about yourself."  Let's hear your answer.  Remember to tailor your answer to highlight relevant skills and experiences for a software engineer role.  Aim for around 1-2 minutes.


[applicant] I'm good...
[interviewer] That's not a complete answer.  Let's try again.  Think about:

* **Your background:** Briefly mention your education and any relevant projects or work experience.  Focus on what makes you a good software engineer.
* **Your skills:** Highlight your technical skills (programming languages, frameworks, tools) and any soft skills relevant to the role (communication, teamwork, problem-solving).  Be specific!  Instead of saying "good problem-solver," describe a situation where you solved a difficult problem.
* **Your career goals:** Briefly mention your career aspirations and why you're interested in this specific role and company.

Try answering "Tell me about yourself" again, keeping those points in mind.  I'll give you feedback afterwards.


[applicant] Yes, background. Well I like turtles.
[interviewer] [Interviewer]  While I appreciate your fondness for turtles, that's not quite what I'm looking for in a "Tell me about yourself" answer for a software engineering interview.  Let's try to focus on your professional experience and skills.  Remember to structure your answer to highlight relevant aspects.  For example, you could start by mentioning your education (e.g., "I recently graduated from [University Name] with a degree in Computer Science"), then talk about any relevant projects or work experience, highlighting the skills you used and the results you achieved.  Then, briefly mention your career goals and why you are interested in this particular role.  Try answering the question again.


[applicant] Experience. I have a ton of experience. I can drive cars, and walk up mountains, and I'm great dancing.
[interviewer] [Interviewer]  Those are all great hobbies, but they don't demonstrate the skills and experience needed for a software engineering role.  We need to focus on your *technical* skills and experience.  For example:

* **What programming languages are you proficient in?** (e.g., Java, Python, C++, JavaScript)  Mention specific projects where you used these languages.
* **What frameworks or libraries have you worked with?** (e.g., React, Angular, Spring, Node.js) Again, provide project examples.
* **What kind of projects have you worked on?**  Describe the projects, your role, and the technologies you used.  Quantify your accomplishments whenever possible (e.g., "Improved application performance by 20%").
* **Have you worked on any team projects?**  This shows your ability to collaborate.

Let's try again.  Tell me about yourself, focusing on your relevant software engineering experience.  Think about a specific project you're proud of, and use it as a framework for your answer.


[applicant] Oh, technical skills. Well, I know how to change a tire on a car, and I'm pretty good at kinemtic maintenance.
[interviewer] [Interviewer]  While those are practical skills, they aren't directly relevant to software engineering.  Let's try a different approach.  Think about a specific project you've worked on – a personal project, a class project, or a job.  Describe that project, highlighting:

* **The problem the project solved:** What was the goal?
* **The technologies you used:** What programming languages, frameworks, databases, etc., did you employ?
* **Your role in the project:** What were your responsibilities?
* **The results you achieved:** What did you accomplish?  Quantify your results whenever possible (e.g., "Reduced bug reports by 15%", "Improved load times by 20%").

For example, you could say something like:  "In my final year project, I developed a [type of application] using [programming language] and [framework].  My role was to [your responsibilities], and I successfully [results achieved]."

Now, tell me about yourself, focusing on a specific project.


[applicant] I built an AI chat assistent, to help candidates practice job interviews.
[interviewer] Okay, that's a good start!  Now let's flesh it out.  Tell me more about this AI chat assistant.  To make your answer stronger, consider these points:

* **Specifics:** What technologies did you use (programming languages, libraries, frameworks, databases)?  Be as specific as possible (e.g., "I used Python with the TensorFlow library and a PostgreSQL database.").
* **Challenges:** What were some of the challenges you faced during development?  How did you overcome them?  This demonstrates your problem-solving skills.
* **Results:** What were the key features of your assistant?  Did you test it? What were the results?  (e.g.,  "I tested it with 10 users and they reported a 15% increase in confidence after using the assistant").
* **Why it's relevant:**  Explain why this project demonstrates your suitability for a software engineering role at the company you are interviewing with.


Try answering the "Tell me about yourself" question again, incorporating these details about your AI chat assistant project.  Remember to keep your answer concise and focused.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="ai-interview-chatbot-terminal-02"></a>
## (5) Design AI Job Interview Practice Chatbot (Terminal) - Version 02

### Code: ai-interview-chatbot-v2.js

```javascript
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL_NAME;
const systemInstruction = `You are an interviewer for a Software Engineer position. After each response from the applicant, ask a relevant follow-up question. Do not analyze, give feedback, or provide any advice; simply ask a natural follow-up question based on the previous response.`
;

const jobTitle = "Software Engineer";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: modelName, systemInstruction: systemInstruction });


// Ensure the history structure is correct, and that parts is always an array
const history = [
  {
    role: "user",
    parts: [{ text: `I am preparing for a ${jobTitle} job interview. Can you help me practice?` }],
  },
  {
    role: "model",
    parts: [{ text: "Tell me about yourself." }],
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

  const rounds = 20; // Currently ctrl-C to exit.

  // Add the system message after the initial history
  //history.push(systemMessage);

  for (let i = 1; i <= rounds; i++) {
    // Prompt user for their response
    process.stdout.write("\n[applicant] ");
    const userResponse = await getUserInput();

    // Append user's response to the chat history
    history.push({
      role: "user",
      parts: [{ text: `[applicant] ${userResponse}` }],
    });

    // Ensure proper message structure when sending to the API
    const formattedHistory = history.map((message) => {
      // Ensure each part is wrapped in { text: "actual text" }
      return {
        role: message.role,
        parts: message.parts.map((part) => {
          if (typeof part === 'string') {
            return { text: part }; // Wrap the string in the expected format
          }
          return part; // Return already well-formed part
        }),
      };
    });

    // console.log(formattedHistory);
    // console.log(formattedHistory[0]);

    // Send the updated history to the model to get the next question
    const chat = model.startChat({ history: formattedHistory });

    // Pass the formatted history to sendMessageStream
    const result = await chat.sendMessageStream({
      messages: formattedHistory,
    }.toString());

    // Capture AI's follow-up question
    let aiResponse = "";
    for await (const chunk of result.stream) {
      aiResponse += chunk.text();
    }

    // Trim the AI's response to remove any excess whitespace or unintended analysis
    aiResponse = aiResponse.trim();

    // Append AI's response (only the follow-up question) to the history
    const interviewerResponse = `[interviewer] ${aiResponse}`;
    history.push({
      role: "model",
      parts: [{ text: interviewerResponse }],
    });

    // Display the interviewer's follow-up question
    console.log("\n" + interviewerResponse);
  }
}

// Start the interview chat loop
interviewChat().catch((err) => console.error("Error:", err));
```

### Run:

```bash
node ./src/ai-interview-chatbot-v2.js
```

[interviewer] Tell me about yourself.

[applicant] Hi, I'm a fullstack software developer. I love creating software, and really enjoy working in teams using the Scrum process. :-)

[interviewer] Can you give me an example of a challenging problem you solved using Scrum?

[applicant] I worked a project to develop api for a car insurance company. There were a number of complexities. API security, rate limiting, safety of API keys, ORM integraton with a database, RAG retrieval from a vector store, along with generative ai chat.

[interviewer] Which of those complexities presented the biggest challenge, and how did you overcome it?

[applicant] Probably the API security, it had a large number of aspects to it. Preventing DOS and DDOS, securing the endpoint, managing API key and key rotation, input cleaning and validation.

[interviewer] How did you ensure the security measures you implemented were effective?

[applicant] By load-testing the endpoints, to check the rate limiters are working, and the load-balancing and scale-out adapt as needed.

[interviewer] What specific tools or technologies did you use for load testing and how did you interpret the results to inform your security measures?

[applicant] We used and AWS cluster using Coiled and Python, to create a very high load on the endpoints.

[interviewer] What metrics did you track during the load tests, and what thresholds did you define for acceptable performance?

[applicant] Eveness of load-balancing across the endpoint, responsiveness of the scale-out, and of the adaptive rate limiters on the endpoints.

[interviewer] Can you elaborate on how you designed the adaptive rate limiters?

```bash
^C
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="ai-interview-chatbot-api-stateful-endpoints"></a>
## (6) Create Stateful API Endpoints for the AI Interview Practice Chatbot using express.js

### Folder structure

```text
research/               # Root directory
├── .env                # Environment variables
├── package.json       
├── node_modules/      
└── src/              
    ├── server.js
    └── ai-interview-chatbot-v4.js
```

### API Endpoints


#### 1. Start Interview

- POST http://localhost:5998/api/interview/start

- Request Headers:
  - Content-Type: application/json

- Request Body:
```json
{
    "jobTitle": "Software Engineer"
}
```

- Response Body:
```json
{
    "sessionId": "1709123456789",  // timestamp-based ID
    "firstQuestion": "Tell me about yourself."
}
```

#### 2. Send Response & Get Next Question
- POST http://localhost:5998/api/interview/respond

- Request Headers:
  - Content-Type: application/json

- Request Body:
```json
{
    "sessionId": "1709123456789",
    "response": "I have 5 years of experience..."
}
```

- Response Body:
```json
{
    "done": false,
    "message": "[interviewer] What specific technologies have you worked with?",
    "round": 1
}
```
// Or when interview is complete:
```json
{
    "done": true,
    "message": "Interview session complete. Thank you for practicing!"
}
```

#### 3. Check Status
- GET http://localhost:5998/api/interview/status/1709123456789

- Response Body:
```json
{
    "jobTitle": "Software Engineer",
    "currentRound": 3,
    "maxRounds": 6,
    "isComplete": false
}
```

#### 4. End Session
- POST http://localhost:5998/api/interview/end

- Request Headers:
  - Content-Type: application/json

- Request Body:
```json
{
    "sessionId": "1709123456789"
}
```

- Response Body:
```json
{
    "success": true
}
```

#### 5. Error Response

```json
{
    "error": "Error message description"
}

```

#### 6. Response headers


- Content-Type: application/json
- Access-Control-Allow-Origin: *  // Due to CORS middleware


### Code: server.js

```javascript
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createSession, processResponse, endSession, getSessionStatus } from './ai-interview-chatbot-express-server.js';

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

```

### Code: ai-interview-chatbot-express-server.js

```javascript
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

```

### Configuration: updated package.json with new dependencies

```json
{
  "name": "ai_job_interviewer",
  "version": "1.0.0",
  "type": "module",
  "description": "Application to provide practice job interviews, using generative AI.",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Astrotope/mr-level-05-fsd-mission-03-research.git"
  },
  "keywords": [
    "ai",
    "interview",
    "job",
    "practice",
    "developer",
    "job",
    "transition",
    "change",
    "management"
  ],
  "author": "Cameron McEwing",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Astrotope/mr-level-05-fsd-mission-03-research/issues"
  },
  "homepage": "https://github.com/Astrotope/mr-level-05-fsd-mission-03-research#readme",
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.0.2"
  }
}


```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="review-ai-api-stateful-endpoints"></a>
## (7) Review of Stateful Chatbot API

- Review:
  - ***Do we need sessions***
  - We currently send the full chat history with each API, so this could be stateless. [Christopher]
  - Occasionally we get an error from the Google SDK. This appears to be an SDK bug. I think all we can do is catch it an re-run the SDK/API call. Going with stateless [REST](https://en.wikipedia.org/wiki/REST) will make this much easier.
    - Error:
```bash
[applicant] Building the AI Chatbot
Error: GoogleGenerativeAIError: [GoogleGenerativeAI Error]: Failed to parse stream
    at file:///Users/cmcewing/Documents/mission_ready/level-05/mission-03/research/src/node_modules/@google/generative-ai/dist/index.mjs:709:46
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
GoogleGenerativeAIError: [GoogleGenerativeAI Error]: Failed to parse stream
    at file:///Users/cmcewing/Documents/mission_ready/level-05/mission-03/research/src/node_modules/@google/generative-ai/dist/index.mjs:709:46
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
chatbot
``` 
    - Error - Research:
      - [Failed to parse final chunk of stream message - Page 1](https://www.googlecloudcommunity.com/gc/AI-ML/Failed-to-parse-final-chunk-of-stream-message-Internal-error/m-p/784340)
      - [Failed to parse final chunk of stream message - Page 2](https://www.googlecloudcommunity.com/gc/AI-ML/Failed-to-parse-final-chunk-of-stream-message-Internal-error/td-p/784340/page/2)
      - [line 693 in index.mjs](https://unpkg.com/browse/@google/generative-ai@0.17.1/dist/index.mjs) 
  - We need to add the interview analysis option to the API. This could simply be a new API endpoint that we send the current conversation to and it returns and analysis of the interview.

- Action Points:
  - Build a stateless [REST](https://en.wikipedia.org/wiki/REST) version of the API to eliminate sessions and simplify code? [Christopher]
  - Have the API return the current chat state with each call, and add the users next response to that state.
  - Add new function and API endpoint for interview analysis.
    - A new system propmt will also be required to guide the analysis.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="ai-api-stateless-rest-endpoints"></a>
## (8) AI Interview Chatbot API - Stateless (REST)


### The Plan:

> Convert this into a stateless RESTful API since we're already sending the complete chat history with each request. This will make the API more scalable and easier to maintain.

- Create a new stateless version of the chatbot API. 

  - Create new ai-interview-chatbot-stateless.js from copy of ai-interview-chatbot-express-server.js
  - Remove all session management code
  - Create a single processInterviewInteraction function that takes jobTitle and history as parameters
  - This function needs to maintain the same AI interaction logic but without storing state

- Create a new stateless version of the server.js as server-stateless.js. With these changes:
  - Simplify to just two endpoints:
      - POST /api/interview/start: Starts a new interview and returns the first question
      - POST /api/interview/respond: Processes a response and returns the next question
  - Chat history will now be maintained on the client side and passed with each request
  - Remove session-related endpoints as they're no longer needed
- Create interview

- Advantages of this approach:

  - True RESTful architecture with no server-side state
  - Better scalability as there's no need to manage sessions
  - Simpler implementation with fewer moving parts
  - Easier to deploy across multiple servers

### Implementation (Much, much simpler.) [Good call Christopher]

#### Start server

```bash
node src/server-stateless.js
```

#### Code: server-stateless.js

```javascript
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { processInterviewInteraction, analyzeInterview } from './ai-interview-chatbot-stateless.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5998;

// Start a new interview
app.post('/api/interview/start', async (req, res) => {
    try {
        const { jobTitle } = req.body;
        if (!jobTitle) {
            return res.status(400).json({ error: 'Job title is required' });
        }
        
        const question = "Tell me about yourself.";
        res.json({ 
            jobTitle,
            question,
            history: [
                {
                    role: "user",
                    parts: [{ text: `I am applying for the ${jobTitle} position. Please start the interview with your first question.` }]
                },
                {
                    role: "model",
                    parts: [{ text: question }]
                }
            ]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Continue interview with a response
app.post('/api/interview/respond', async (req, res) => {
    try {
        const { jobTitle, response, history } = req.body;
        if (!jobTitle || !response || !history) {
            return res.status(400).json({ 
                error: 'Job title, response, and history are required' 
            });
        }

        // Add user's response to history
        const updatedHistory = [...history, {
            role: "user",
            parts: [{ text: response }]
        }];

        // Get next question
        const question = await processInterviewInteraction(jobTitle, updatedHistory);
        
        // Add AI's question to history
        updatedHistory.push({
            role: "model",
            parts: [{ text: question }]
        });

        res.json({
            jobTitle,
            question,
            history: updatedHistory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Analyze the interview
app.post('/api/interview/analyze', async (req, res) => {
    try {
        const { jobTitle, history } = req.body;
        if (!jobTitle || !history) {
            return res.status(400).json({ 
                error: 'Job title and history are required' 
            });
        }

        const analysis = await analyzeInterview(jobTitle, history);
        res.json({
            jobTitle,
            analysis,
            history
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

#### Code: ai-interview-chatbot-stateless.js

```javascript
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
```

### API Endpoints:

#### /api/interview/start

- POST http://localhost:5998/api/interview/start
- Request Headers:
  - Content-Type: application/json
- Request (JSON):

```bash
curl -X POST http://localhost:5998/api/interview/start \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "Software Engineer"
  }' | jq '.'
```

- Response (JSON):

```json
{
  "jobTitle": "Software Engineer",
  "question": "Tell me about yourself.",
  "history": [
    {
      "role": "user",
      "parts": [
        {
          "text": "I am applying for the Software Engineer position. Please start the interview with your first question."
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "Tell me about yourself."
        }
      ]
    }
  ]
}
```

#### /api/interview/respond

- POST http://localhost:5998/api/interview/respond
- Request Headers:
  - Content-Type: application/json
- Request (JSON): Reply with chat history, and user response.

```bash
curl -X POST http://localhost:5998/api/interview/respond \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "Software Engineer",
    "response": "I am a software engineer with 5 years of experience in full-stack development. I specialize in building scalable web applications using React, Node.js, and cloud technologies. In my current role, I lead a team of three developers and have successfully delivered several high-impact projects.",
    "history": [
      {
        "role": "user",
        "parts": [{ "text": "I am applying for the Software Engineer position. Please start the interview with your first question." }]
      },
      {
        "role": "model",
        "parts": [{ "text": "Tell me about yourself." }]
      }
    ]
  }' | jq '.'
```

- Response (JSON):

```json
{
  "jobTitle": "Software Engineer",
  "question": "Can you describe one of those high-impact projects in more detail?\n",
  "history": [
    {
      "role": "user",
      "parts": [
        {
          "text": "I am applying for the Software Engineer position. Please start the interview with your first question."
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "Tell me about yourself."
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "I am a software engineer with 5 years of experience in full-stack development. I specialize in building scalable web applications using React, Node.js, and cloud technologies. In my current role, I lead a team of three developers and have successfully delivered several high-impact projects."
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "Can you describe one of those high-impact projects in more detail?\n"
        }
      ]
    }
  ]
}
```

#### /api/interview/analyze

- POST http://localhost:5998/api/interview/analyze
- Request Headers:
  - Content-Type: application/json
- Request (JSON): Reply with chat history only.

```bash
curl -X POST http://localhost:5998/api/interview/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "Software Engineer",
    "history": [
      {
        "role": "user",
        "parts": [{ "text": "I am applying for the Software Engineer position. Please start the interview with your first question." }]
      },
      {
        "role": "model",
        "parts": [{ "text": "Tell me about yourself." }]
      },
      {
        "role": "user",
        "parts": [{ "text": "I am a software engineer with 5 years of experience in full-stack development. I specialize in building scalable web applications using React, Node.js, and cloud technologies. In my current role, I lead a team of three developers and have successfully delivered several high-impact projects." }]
      },
      {
        "role": "model",
        "parts": [{ "text": "Can you tell me about a specific challenging project you'"'"'ve worked on and how you overcame the technical challenges?" }]
      },
      {
        "role": "user",
        "parts": [{ "text": "One of my most significant projects was a real-time collaboration platform that served over 10,000 users. We built it using WebSocket for real-time updates, React for the frontend, and Node.js with MongoDB for the backend. The biggest challenge was ensuring data consistency across multiple concurrent users, which we solved using operational transformation and a robust conflict resolution system." }]
      },
      {
        "role": "model",
        "parts": [{ "text": "That'"'"'s impressive! How did you ensure the scalability of the WebSocket connections and handle potential server load issues?" }]
      }
    ]
  }' | jq '.'
```

- Response (JSON):

```json
{
  "jobTitle": "Software Engineer",
  "analysis": "Let's analyze this short interview snippet.  Your responses demonstrate some strengths but also highlight areas for improvement.\n\n**1. Strengths and Impressive Points:**\n\n* **Concise Self-Introduction:** Your opening statement clearly and efficiently conveyed your experience level, technical skills, and leadership responsibilities.  This is a strong start.\n* **Project Focus:**  You immediately steered the conversation toward a relevant project, demonstrating experience with a complex, large-scale application. This shows initiative and a proactive approach to showcasing your capabilities.\n* **Technical Depth (partially):** Mentioning specific technologies (React, Node.js, MongoDB, WebSockets) shows competence.  You also correctly identified a key challenge (data consistency in a real-time application).\n\n**2. Areas for Improvement:**\n\n* **Lack of Specifics and Quantifiable Results:** While you mentioned challenges and technologies, you lacked specifics in describing *how* you overcame them. Saying you used \"operational transformation\" and a \"robust conflict resolution system\" isn't enough.  The interviewer needs concrete examples.  What specific techniques did you use within operational transformation? How did your conflict resolution system work practically?  What metrics show the success of your solutions? (e.g., reduction in error rates, improved latency, increased user engagement).\n* **Insufficient Scalability Detail:**  Your answer regarding scalability was too vague. You need to elaborate on your approach to handling WebSocket connections at scale. Did you use load balancing?  Did you implement sharding?  What strategies did you employ to minimize latency and maximize throughput?  Again, quantifiable results are crucial (e.g., \"We reduced average latency by 20% by implementing...\" ).\n* **Missed Opportunity to Showcase Leadership:** You mentioned leading a team of three, but you didn't illustrate your leadership skills.  Describe a situation where you mentored a team member, resolved a conflict, or made a strategic decision that impacted the project's success.\n\n\n**3. Specific Suggestions for Better Answers:**\n\n* **Example of improved answer regarding the real-time collaboration platform:**  \"One of my most challenging projects was building a real-time collaboration platform for over 10,000 concurrent users.  We used WebSockets for real-time updates, React on the front-end, and a Node.js backend with MongoDB.  The biggest hurdle was maintaining data consistency. We addressed this by implementing operational transformation using the CRDT (Conflict-free Replicated Data Type) approach, specifically the [mention a specific CRDT type, e.g., CmRDT or CvRDT]. This allowed us to handle concurrent edits gracefully.  For conflict resolution, we implemented a last-write-wins strategy with versioning, ensuring that the most recent changes were always applied. We also implemented [mention specific techniques, e.g., heartbeat mechanisms] to detect and handle client disconnections. This resulted in a 99.99% uptime and a reduction in data inconsistency errors by 80% compared to our initial prototype.\"\n\n* **Example of improved answer regarding scalability:** \"To ensure scalability, we employed several strategies. We used a load balancer to distribute traffic across multiple Node.js servers.  We implemented horizontal scaling, adding more servers as needed based on CPU usage and network traffic.  Furthermore, we implemented connection pooling to optimize resource utilization.  These measures allowed us to handle peak loads of over 15,000 concurrent users without significant performance degradation.\"\n\n\n**4. Overall Communication Style:**\n\nYour communication style is clear and direct, but it lacks the depth and detail necessary to demonstrate your expertise effectively.  Focus on using the STAR method (Situation, Task, Action, Result) to structure your answers.  This will help you provide concise and impactful responses that highlight your skills and accomplishments.  Quantify your achievements whenever possible using metrics and numbers.  Finally, practice your answers beforehand to sound confident and articulate.  Remember, the interviewer wants to understand not just *what* you did, but *how* you did it and the impact you made.\n",
  "history": [
    {
      "role": "user",
      "parts": [
        {
          "text": "I am applying for the Software Engineer position. Please start the interview with your first question."
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "Tell me about yourself."
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "I am a software engineer with 5 years of experience in full-stack development. I specialize in building scalable web applications using React, Node.js, and cloud technologies. In my current role, I lead a team of three developers and have successfully delivered several high-impact projects."
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "Can you tell me about a specific challenging project you've worked on and how you overcame the technical challenges?"
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "One of my most significant projects was a real-time collaboration platform that served over 10,000 users. We built it using WebSocket for real-time updates, React for the frontend, and Node.js with MongoDB for the backend. The biggest challenge was ensuring data consistency across multiple concurrent users, which we solved using operational transformation and a robust conflict resolution system."
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "That's impressive! How did you ensure the scalability of the WebSocket connections and handle potential server load issues?"
        }
      ]
    }
  ]
}
```

- Response as Markdown: (Will convert AI Markdown to HTML, to display in Frontend)

Let's analyze this short interview snippet.  Your responses demonstrate some strengths but also highlight areas for improvement.

**1. Strengths and Impressive Points:**

* **Concise Self-Introduction:** Your opening statement clearly and efficiently conveyed your experience level, technical skills, and leadership responsibilities.  This is a strong start.
* **Project Focus:**  You immediately steered the conversation toward a relevant project, demonstrating experience with a complex, large-scale application. This shows initiative and a proactive approach to showcasing your capabilities.
* **Technical Depth (partially):** Mentioning specific technologies (React, Node.js, MongoDB, WebSockets) shows competence.  You also correctly identified a key challenge (data consistency in a real-time application).

**2. Areas for Improvement:**

* **Lack of Specifics and Quantifiable Results:** While you mentioned challenges and technologies, you lacked specifics in describing *how* you overcame them. Saying you used "operational transformation" and a "robust conflict resolution system" isn't enough.  The interviewer needs concrete examples.  What specific techniques did you use within operational transformation? How did your conflict resolution system work practically?  What metrics show the success of your solutions? (e.g., reduction in error rates, improved latency, increased user engagement).
* **Insufficient Scalability Detail:**  Your answer regarding scalability was too vague. You need to elaborate on your approach to handling WebSocket connections at scale. Did you use load balancing?  Did you implement sharding?  What strategies did you employ to minimize latency and maximize throughput?  Again, quantifiable results are crucial (e.g., "We reduced average latency by 20% by implementing..." ).
* **Missed Opportunity to Showcase Leadership:** You mentioned leading a team of three, but you didn't illustrate your leadership skills.  Describe a situation where you mentored a team member, resolved a conflict, or made a strategic decision that impacted the project's success.


**3. Specific Suggestions for Better Answers:**

* **Example of improved answer regarding the real-time collaboration platform:**  "One of my most challenging projects was building a real-time collaboration platform for over 10,000 concurrent users.  We used WebSockets for real-time updates, React on the front-end, and a Node.js backend with MongoDB.  The biggest hurdle was maintaining data consistency. We addressed this by implementing operational transformation using the CRDT (Conflict-free Replicated Data Type) approach, specifically the [mention a specific CRDT type, e.g., CmRDT or CvRDT]. This allowed us to handle concurrent edits gracefully.  For conflict resolution, we implemented a last-write-wins strategy with versioning, ensuring that the most recent changes were always applied. We also implemented [mention specific techniques, e.g., heartbeat mechanisms] to detect and handle client disconnections. This resulted in a 99.99% uptime and a reduction in data inconsistency errors by 80% compared to our initial prototype."

* **Example of improved answer regarding scalability:** "To ensure scalability, we employed several strategies. We used a load balancer to distribute traffic across multiple Node.js servers.  We implemented horizontal scaling, adding more servers as needed based on CPU usage and network traffic.  Furthermore, we implemented connection pooling to optimize resource utilization.  These measures allowed us to handle peak loads of over 15,000 concurrent users without significant performance degradation."


**4. Overall Communication Style:**

Your communication style is clear and direct, but it lacks the depth and detail necessary to demonstrate your expertise effectively.  Focus on using the STAR method (Situation, Task, Action, Result) to structure your answers.  This will help you provide concise and impactful responses that highlight your skills and accomplishments.  Quantify your achievements whenever possible using metrics and numbers.  Finally, practice your answers beforehand to sound confident and articulate.  Remember, the interviewer wants to understand not just *what* you did, but *how* you did it and the impact you made.

#### API Error Handling

- Both endpoints handle errors with appropriate HTTP status codes:

  - 400 Bad Request: Missing required fields
  - 500 Internal Server Error: Server-side errors

#### Maintaining History in stateless REST API

- The history array in both endpoints maintains the conversation context, alternating between "user" and "model" roles, with each message containing parts with text content.


### Conversation Flow

```text
Client                                Stateless API
  |                                         |
  |  1. POST /api/interview/start           |
  |  {"jobTitle": "Software Engineer"}      |
  |---------------------------------------->|
  |                                         |
  |  Response: First question + history     |
  |<----------------------------------------|
  |                                         |
  |  2. POST /api/interview/respond         |
  |  {jobTitle, response, history}          |
  |---------------------------------------->|
  |                                         |
  |  Response: Next question + history      |
  |<----------------------------------------|
  |                                         |
  |  3. POST /api/interview/respond         |
  |  {jobTitle, response, history}          |
  |---------------------------------------->|
  |                                         |
  |  Response: Next question + history      |
  |<----------------------------------------|
  |                                         |
  |  4. POST /api/interview/analyze         |
  |  {jobTitle, history}                    |
  |---------------------------------------->|
  |                                         |
  |  Response: Analysis + history           |
  |<----------------------------------------|
  |                                         |
  
```

### History JSON Structure

```text

History Structure (passed in each request):
+------------------+
|     history      |
|  +-----------+   |
|  | Message 1 |   |
|  |  - role   |   |
|  |  - parts  |   |
|  +-----------+   |
|  | Message 2 |   |
|  |  - role   |   |
|  |  - parts  |   |
|  +-----------+   |
|      ...         |
+------------------+
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="ai-practice-interview-chatbot-frontend"></a>
## (9) AI Practice Interview Chatbot - Frontend Design

### Technologies

- React JS
- Semantic UI (UI Elements)
- Tailwind CSS (Canned styling)
- React Markdown (for formatting AI output)

### Specification

- Responsive Design, that works on mobile and desktop.
- Good UI visual flow, and intuitive feel.
- Clean consistent UI elements.
- Professional looking fonts.
- Good use of white space.

### Notes

- Store the frontend in ./frontend

### Product Owner Specification

- Due to the insurance process redesign, management is expecting a lot of staff in the department to be re-trained into other roles.  

- Build an application that can be used by a staff member to practice job interviews for another role.  Here is a description of the requirements.

- The wireframe below demonstrates the items required.  You do not need to make it look exactly the same size and colour.  Only the elements need to be there.    

- The user will see the following items.

  - A “Job title” textbox that allow users to type in a job title that they interview for. It is a free-text field, not a drop down selection.

  - A \<div\> or textarea in the middle that displays both what the user typed and the response of the AI Interviewer as they appear.

  - A textbox that allow users to type in response

  - A submit button that will submit the response to the application. Upon receiving the response, the application will send the response to generative AI via API to get a response.

 

- For the AI functionality,

  - The AI acts as a job interviewer for the job the user specified.  It should ask a series of questions to the user, and can adjust its response based on the answers.

  - The flow will start with the Interviewer saying “Tell me about yourself”.  
  - It should ask at least 6 questions based on response of the user.  
  -  Other than the first question, the questions should not to be “hardcoded” in the prompt or in the code. 
  -  You can however mention topic areas to ask questions for (if needed).

  - The questions should be to interview for the role typed in by the user.

  - At the end of the whole interview, the AI Interviewer should comment on how well the user answered the questions, and suggest how the user can improve its response.

	- Use generative AI to build the application.  You are encouraged to use Google Gemini API because it is currently free of charge.

### UI Mockup:

#### Initial UI

![image](https://github.com/user-attachments/assets/96c2233c-b657-4d26-b026-42dfbf204f53)

---

![image](https://github.com/user-attachments/assets/9a6b5e3a-d2d1-43f4-9772-f25df9c2768c)



#### Conversation flow

![image](https://github.com/user-attachments/assets/a64e985c-6ffc-4c23-b805-f905a7791dcf)


#### Final Analysis

![image](https://github.com/user-attachments/assets/8ba806c6-d9ab-43bc-b7d9-b9783baca705)
![image](https://github.com/user-attachments/assets/0578416c-53bc-4f77-9470-a2930d6bb8a1)
![image](https://github.com/user-attachments/assets/7d84cc2f-7999-4ca3-b20d-ea47d432a926)


### UI Code:

#### App.jsx

```javascript
import React, { useState } from 'react';
import { Container, Header, Button, Form, TextArea, Segment, Message } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

const API_URL = 'http://localhost:5998';

function App() {
  const [jobTitle, setJobTitle] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startInterview = async () => {
    if (!jobTitle) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/interview/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle })
      });
      const data = await res.json();
      setChatHistory(data.history);
      setAnalysis(null);
    } catch (error) {
      console.error('Error starting interview:', error);
    }
    setIsLoading(false);
  };

  const sendResponse = async () => {
    if (!response || !jobTitle) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/interview/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          response,
          history: chatHistory
        })
      });
      const data = await res.json();
      setChatHistory(data.history);
      setResponse('');
    } catch (error) {
      console.error('Error sending response:', error);
    }
    setIsLoading(false);
  };

  const analyzeInterview = async () => {
    if (!jobTitle || chatHistory.length === 0) return;
    setIsLoading(true);
    setIsAnalyzing(true);
    try {
      const res = await fetch(`${API_URL}/api/interview/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          history: chatHistory
        })
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing interview:', error);
    }
    setIsLoading(false);
    // Keep isAnalyzing true so we can show the completion message
    setTimeout(() => setIsAnalyzing(false), 6000); // Reset after 6 seconds
  };

  return (
    <div className="min-h-screen bg-gray-50 p-16">
      <Container>
        <Segment raised padded="very" className="!px-12 !py-6 border border-gray-200 shadow-sm rounded-lg">
          <Header 
            as="h1" 
            className="font-sans text-3xl font-semibold mb-8 !pl-2 !pr-4 !py-3 rounded-md"
            color="blue"
            style={{ color: '#007FFF', padding: '0.75rem 1rem 0.75rem 0.5rem' }}
          >
            AI Practice Interview Assistant
          </Header>

          <Segment raised style={{ marginBottom: '1.5rem' }}>
            <Form>
              <Form.Field>
                <label>Job Title</label>
                <input
                  placeholder="Enter the job title..."
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && startInterview()}
                />
              </Form.Field>
              <Button 
                primary 
                size="large" 
                onClick={startInterview}
                disabled={isLoading || !jobTitle}
              >
                {chatHistory.length > 0 ? 'Re-start Interview' : 'Start Interview'}
              </Button>
            </Form>
          </Segment>

          {chatHistory.length > 0 && (
            <Segment raised style={{ marginBottom: '1.5rem' }}>
              {chatHistory.slice(1).map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 p-3 rounded-lg ${
                    msg.role === 'model'
                      ? 'bg-blue-50 text-blue-800'
                      : 'bg-gray-50 text-gray-800'
                  }`}
                >
                  <span className="font-semibold">
                    {msg.role === 'model' ? '[Interviewer] ' : '[Applicant] '}
                  </span>
                  {msg.parts[0].text}
                </div>
              ))}
            </Segment>
          )}

          <Segment raised style={{ marginBottom: '1.5rem' }}>
            <Form>
              <TextArea
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                style={{ minHeight: 100 }}
                disabled={!chatHistory.length || isLoading}
              />
            </Form>
          </Segment>

          <div className="flex justify-end space-x-4" style={{ marginBottom: '1.5rem' }}>
            <Button
              primary
              size="large"
              onClick={sendResponse}
              disabled={isLoading || !response || !chatHistory.length}
            >
              Send Response
            </Button>
            <Button
              primary
              size="large"
              onClick={analyzeInterview}
              disabled={isLoading || !chatHistory.length}
            >
              Analyse Interview
            </Button>
          </div>

          {isAnalyzing && (
            <Message
              info={!analysis}
              success={!!analysis}
              style={{ marginBottom: '1.5rem' }}
            >
              <Message.Header className="!font-light">
                <span className="!font-light">
                  {analysis 
                    ? "Thank you for waiting. I have completed your interview analysis. Here are the results..."
                    : "Please wait as I evaluate your interview performance. This will take a moment..."}
                </span>
              </Message.Header>
            </Message>
          )}

          {analysis && (
            <Segment raised style={{ marginBottom: '1.5rem' }}>
              <h3 className="text-xl font-semibold mb-4">Interview Analysis</h3>
              <div className="prose max-w-none">
                <ReactMarkdown 
                  className="text-gray-700"
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-base font-bold mt-3 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                    li: ({node, ...props}) => <li className="mb-2" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                    em: ({node, ...props}) => <em className="italic" {...props} />,
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4" {...props} />
                    ),
                    code: ({node, ...props}) => (
                      <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm" {...props} />
                    ),
                  }}
                >
                  {analysis}
                </ReactMarkdown>
              </div>
            </Segment>
          )}
        </Segment>
      </Container>
    </div>
  );
}

export default App;

```

#### main.jsx

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

``` 

#### index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background-color: #f9fafb;
}

/* Custom input styling */
.ui.input {
  width: 100% !important;
}

.ui.input > input,
.ui.form input:not([type]),
.ui.form input[type="text"] {
  border: 1px solid #e5e7eb !important;
  border-radius: 0.375rem !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  padding: 0.75rem 1rem !important;
  transition: border-color 0.15s ease-in-out;
}

.ui.input > input:focus,
.ui.form input:not([type]):focus,
.ui.form input[type="text"]:focus {
  border-color: #4682B4 !important;
  box-shadow: 0 0 0 1px #4682B4 !important;
}

/* Custom styles for chat messages */
.message-container {
  max-height: 60vh;
  overflow-y: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.message {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
}

.message.user {
  background-color: #e3f2fd;
  margin-left: 2rem;
}

.message.assistant {
  background-color: #f3e5f5;
  margin-right: 2rem;
}

/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

```

### Run fullstack

#### Download/Clone from GitHub & Configure

```bash
mkdir mission-03-research 
cd mission-03-research
git clone https://github.com/Astrotope/mr-level-05-fsd-mission-03-research.git
cd mr-level-05-fsd-mission-03-research
npm install
[add your google-ai as GEMINI_API_KEY to .env]
[set the name of the google-ai model you wish to use in .env as GEMINI_MODEL_NAME. Choose a model that will accept text, and return text.]
```

#### Run backend

- in terminal (in project root directory)
  - on port 5998

```bash
node ./src/server-stateless.js
```

####  Run frontend

- in separate terminal (in project root directory)

```bash
cd frontend
npm run dev
```

#### Interesting AI Bug (Ellipsis Bug - AI will continue the users response if they finish it with an ellipsis.)

![image](https://github.com/user-attachments/assets/62f0763e-60e7-4757-a98c-e56080875230)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="gemini-1-5-flash-8b-model-spec"></a>
## (10) Gemini 1.5 Flash-8B is a small model designed for lower intelligence tasks. Fastest model (ideal for chat).

![image](https://github.com/user-attachments/assets/1355ae28-1a44-42c9-ae39-642cbaeb4455)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="tdd-plan"></a>

## (11) Test Driven Development Plan.


### Plan for code modularization and testing:

* Modularization Opportunities
  - AI Service Layer
	* Create a separate AIService class to handle all Gemini AI interactions
	* Move model initialization and chat handling logic into this class
	* This will make it easier to mock AI responses for testing
* Message Formatter
	* Extract message formatting logic into a separate utility
	* Will handle conversion between different message formats
	* Can be reused across both interview processing and analysis
* Validation Layer
	* Create a separate validation module
	* Move input validation logic from route handlers
	* Can be reused across different endpoints
* Configuration Module
	* Separate environment configuration into its own module
	* Will make it easier to manage different configurations for testing
* Response Formatter
	* Create a utility for standardizing API responses
	* Will ensure consistent error and success response formats

	
### Proposed Function Structure

```text
src/
├── services/
│   ├── AIService.js
│   └── InterviewService.js
├── utils/
│   ├── messageFormatter.js
│   ├── responseFormatter.js
│   └── validator.js
├── config/
│   └── config.js
└── routes/
    └── interviewRoutes.js
```

### Test Categories and Test Cases

* Unit Tests: Message Formatting
	* Format user messages to AI format
	* Format AI responses to client format
	* Handle empty messages
	* Handle malformed message structures
	* Validate message role conversions
* Unit Tests: Input Validation
	* Validate job title presence
	* Validate response content
	* Validate history structure
	* Handle missing required fields
	* Handle invalid data types
* Unit Tests: AI Service
	* Initialize AI model with correct configuration
	* Format system instructions
	* Handle chat history correctly
	* Process streaming responses
	* Handle API errors
* Unit Tests: Interview Service
	* Generate initial interview question
	* Process interview responses
	* Generate interview analysis
	* Handle empty history
	* Handle invalid job titles
* Integration Tests: API Endpoints
	* Start new interview
	* Send interview responses
	* Generate interview analysis
	* Handle invalid requests
	* Test error responses
* Integration Tests: End-to-End Flow
	* Complete interview flow
	* Multiple question-answer exchanges
	* Analysis of complete interview
	* Error recovery scenarios

### Functions to be Unit Tested

* Existing Functions:
	* processInterviewInteraction
	* analyzeInterview
* New Functions to Create and Test:
	* formatMessageHistory
	* validateInterviewRequest
	* validateAnalysisRequest
	* createSystemInstruction
	* processAIResponse
	* initializeAIModel
	* formatAPIResponse
	* handleStreamResponse
	* validateJobTitle
	* validateMessageHistory
* Testing Strategy Notes
	* Use dependency injection for AI service to allow mocking
	* Create fixtures for common test data
	* Use snapshot testing for response formats
	* Implement error boundary testing
	* Use mock responses for AI interactions
	* Test both success and failure paths
	* Include performance testing for streaming responses
	* Test rate limiting and error handling
	* Validate response formats and structures
	* Test configuration loading and validation

> This plan focuses on making the code more modular, easier to test, and following the DRY principle while maintaining the current functionality.

### Testing Framework Tools we may/could potentially use

* Jest Extensions
	* @types/jest - For better TypeScript/IDE support
	* jest-environment-node - For Node.js environment testing
	* jest-mock - Enhanced mocking capabilities
* Testing Utilities
	* supertest - For HTTP endpoint testing
	* nock - For mocking HTTP requests
	* mock-socket - For WebSocket testing if needed
	* jest-mock-extended - For advanced mocking capabilities
* Validation Libraries
	* joi or yup - For input validation
	* ajv - For JSON schema validation
* Development Tools
	* eslint-plugin-jest - ESLint rules for Jest
	* prettier - Code formatting
	* husky - Git hooks for pre-commit testing
	* lint-staged - Run linters on staged files
* Code Coverage
	* istanbul - Code coverage reporting
	* jest-junit - JUnit report generation for CI/CD
* Mocking Utilities
	* sinon - Spies, stubs, and mocks
	* faker or @faker-js/faker - Generate test data

### Function Description - Existing & New (Refactored)

#### Existing Functions

---

##### processInterviewInteraction (Existing)
Processes an interview interaction and generates the next interview question.

**Input Parameters:**
- `jobTitle` (string): The position being interviewed for
- `history` (Array): Array of previous interactions in the format:
  ```javascript
  {
    role: "user" | "model",
    parts: [{ text: string }]
  }
  ```

**Output:**
- Returns (Promise<string>): The AI's next interview question

**Function:**
- Configures AI as an interviewer for specific job position
- Processes conversation history
- Generates contextually relevant follow-up questions
- Handles streaming responses from AI

---

##### analyzeInterview (Existing)
Analyzes the complete interview conversation and provides detailed feedback.

**Input Parameters:**
- `jobTitle` (string): The position being interviewed for
- `history` (Array): Complete interview conversation history

**Output:**
- Returns (Promise<string>): Detailed interview analysis and feedback

**Function:**
- Configures AI as an interview analyst
- Reviews entire conversation
- Generates structured feedback on performance
- Provides specific improvement suggestions

---

#### New Functions

##### formatMessageHistory (This would be a good refactor)
Standardizes message format between client and AI service.

**Input Parameters:**
- `messages` (Array): Raw message array from client
- `format` (string): Target format ('ai' | 'client')

**Output:**
- Returns (Array): Formatted message array

**Function:**
- Converts between different message formats
- Validates message structure
- Handles edge cases and malformed messages

---

##### validateInterviewRequest (Check if Gemini response is valid, before we use it)
Validates incoming interview interaction requests.

**Input Parameters:**
- `request` (Object): Request body containing:
  - `jobTitle` (string)
  - `response` (string)
  - `history` (Array)

**Output:**
- Returns (Object): 
  ```javascript
  {
    isValid: boolean,
    errors: string[]
  }
  ```

**Function:**
- Validates required fields
- Checks data types
- Ensures proper message history structure

---

##### validateAnalysisRequest (Checks if Gemini analysis response is valid, befor displaying it)
Validates interview analysis requests.

**Input Parameters:**
- `request` (Object): Request body containing:
  - `jobTitle` (string)
  - `history` (Array)

**Output:**
- Returns (Object):
  ```javascript
  {
    isValid: boolean,
    errors: string[]
  }
  ```

**Function:**
- Validates required fields
- Ensures minimum conversation length
- Checks history structure

---

##### createSystemInstruction (This is a good refactor, it is a factory for system instructions. This could simply be a JSON array rather than a function)
Generates system instructions for AI model based on context.

**Input Parameters:**
- `type` (string): Instruction type ('interviewer' | 'analyst')
- `jobTitle` (string): Position being interviewed for
- `options` (Object): Additional configuration options

**Output:**
- Returns (string): Formatted system instruction

**Function:**
- Creates role-specific instructions
- Incorporates job context
- Handles different instruction types

---

##### processAIResponse (Converts raw AI response into something that can be displayed)
Processes and formats AI model responses.

**Input Parameters:**
- `response` (Object): Raw AI response
- `format` (string): Desired output format

**Output:**
- Returns (Object): Formatted response object

**Function:**
- Extracts relevant information
- Formats response structure
- Handles errors and edge cases

---

##### initializeAIModel (I think this is good, put the AI model setup into its own function)
Initializes and configures the AI model.

**Input Parameters:**
- `config` (Object): Configuration options
  - `apiKey` (string)
  - `modelName` (string)
  - `systemInstruction` (string)

**Output:**
- Returns (Object): Configured AI model instance

**Function:**
- Sets up AI configuration
- Initializes model with parameters
- Handles initialization errors

---

##### formatAPIResponse (This sounds like a duplicate of processAIResponse)
Standardizes API response format.

**Input Parameters:**
- `data` (any): Response data
- `status` (string): Response status
- `error` (Error?): Optional error object

**Output:**
- Returns (Object): Formatted API response

**Function:**
- Creates consistent response structure
- Handles success and error cases
- Includes relevant metadata

---

##### handleStreamResponse (This is potentially a good refactor.)
Manages streaming responses from AI model.

**Input Parameters:**
- `stream` (ReadableStream): AI response stream
- `options` (Object): Stream handling options

**Output:**
- Returns (Promise<string>): Assembled response

**Function:**
- Processes streaming data
- Assembles complete response
- Handles stream errors

---

##### validateJobTitle (I guess we should do some basic checks on this, as some malicious inputs could cause the AI to go beyond it guardrails)
Validates job title input.

**Input Parameters:**
- `jobTitle` (string): Job title to validate
- `options` (Object): Validation options

**Output:**
- Returns (Object):
  ```javascript
  {
    isValid: boolean,
    error?: string
  }
  ```

**Function:**
- Checks string length
- Validates format
- Filters inappropriate content

---

##### validateMessageHistory (A function to check if the message history is in the correct format.)
Validates conversation history structure and content.

**Input Parameters:**
- `history` (Array): Message history array
- `options` (Object): Validation options

**Output:**
- Returns (Object):
  ```javascript
  {
    isValid: boolean,
    errors: string[]
  }
  ```

**Function:**
- Validates message structure
- Checks sequence integrity
- Ensures proper role alternation

### Function Description - Refactored server.js

#### TBD - Some possible changes.

- simpler server.js that redirects to route-handler.js to handle the API routes.

- simpler server.js - potential code

```javascript
import express from 'express';
import cors from 'cors';
import { interviewRoutes } from './routes/interviewRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { configureApp } from './config/app.js';

const app = express();
configureApp(app);  // Middleware setup

// Routes
app.use('/api/interview', interviewRoutes);

// Error handling
app.use(errorHandler);

export default app;
```

- route-handler.js

```javascript
// Example structure for interviewRoutes.js
import { Router } from 'express';
import { validateStartRequest, validateResponseRequest, validateAnalysisRequest } from '../middleware/validation.js';
import { formatResponse } from '../utils/responseFormatter.js';
import { InterviewService } from '../services/interviewService.js';

const router = Router();
const interviewService = new InterviewService();

// Start a new interview
router.post('/start', validateStartRequest, async (req, res, next) => {
    try {
        const { jobTitle } = req.body;
        const result = await interviewService.startInterview(jobTitle);
        res.json(formatResponse(result, 'Interview started successfully'));
    } catch (error) {
        next(error);
    }
});

// Continue interview with a response
router.post('/respond', validateResponseRequest, async (req, res, next) => {
    try {
        const { jobTitle, response, history } = req.body;
        const result = await interviewService.processResponse(jobTitle, response, history);
        res.json(formatResponse(result, 'Response processed successfully'));
    } catch (error) {
        next(error);
    }
});

// Analyze the interview
router.post('/analyze', validateAnalysisRequest, async (req, res, next) => {
    try {
        const { jobTitle, history } = req.body;
        const result = await interviewService.analyzeInterview(jobTitle, history);
        res.json(formatResponse(result, 'Interview analyzed successfully'));
    } catch (error) {
        next(error);
    }
});

export default router;
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="gemini-sdk-notes"></a>


## (12) Gemini Chat SDK - Key Things to Know

Here are the 4 key things your programming team should know about the Gemini Chat SDK:

* System Instructions are Powerful
	* Set via systemInstruction in model configuration
	* Defines AI's role, behavior, and constraints
	* Must be set during model initialization, not in chat history
	* Example: 

	```javascript
	genAI.getGenerativeModel({ 
		model: modelName, 
		systemInstruction: instruction 
	})
	```

* Chat History Structure is Strict
*
	* Messages must follow specific format:

	```javascript
	{
	  role: "user" | "model",
	  parts: [{ text: string }]
	}
	```

	* 	Order matters - messages should alternate between user and model
	* 	Can't modify previous messages once sent
	* 	History must be provided in full for each request


* Responses are Always Streamed
	* All responses come as streams by default
	* Must handle with async iteration:

	```javascript
	for await (const chunk of result.stream) {
	  response += chunk.text();
	}
	```

	* No built-in non-streaming option
	* Need to accumulate chunks for complete response

* Error Handling is Critical
	* API can fail for various reasons (rate limits, invalid input, network issues)
	* Always wrap calls in try-catch blocks
	* Stream can fail mid-response
	* Need to handle both initialization and streaming errors
	* Important to implement retries for reliability

These points cover the most important aspects that affect implementation and reliability of applications using the Gemini Chat SDK.
