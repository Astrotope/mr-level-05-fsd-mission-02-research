# Google Gemini

## Testing 

```bash
curl \
  -H "Content-Type: application/json" \
  -d "{\"contents\":[{\"parts\":[{\"text\":\"Explain how AI works\"}]}]}" \
  -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=[MY_API_KEY]"
```

## Results

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
## Node.js setup

```
mkdir src && cd src
npm init
npm install -D jest
npm install @google/generative-ai
```

## Node.js code

---

### text-generation.js

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());
```

---

### package.json needs ' "type": "module", ' added.

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

## Trial run

```bash
node text-generation.js   
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

---

## Text streaming output (with apiKey and modelName stored in .env)

### text-stream.js

```javascript                                                                                                                                                                                import dotenv from 'dotenv';
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
### .env

```text
GEMINI_API_KEY="[MY_API_KEY]"
GEMINI_MODEL_NAME="gemini-1.5-flash"
```

### Output

```bash
node text-stream.js
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

---

## Design AI Job Interview Practic Chatbot - Version 01

### ai-interview-chatbot.js

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

### Output 

(This chatbot was a little chatty, it didn't limit itself to follow-up questions. It provided an analysis of the applicants response, with suggestions of how to improve it. I didn't give sufficient guidence on what output I was expecting.)


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



---

## Design AI Job Interview Practic Chatbot - Version 02

### ai-interview-chatbot-v2.js

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

### Output

```bash
node ai-interview-chatbot-v2.js
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

---

## Gemini 1.5 Flash-8B is a small model designed for lower intelligence tasks. Fastest model (ideal for chat).

![image](https://github.com/user-attachments/assets/1355ae28-1a44-42c9-ae39-642cbaeb4455)

