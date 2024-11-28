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

### ai-interview.js

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
node ai-interview.js   
```

---
                                                                                                                                                                               ─╯
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

```javascript
cat text-stream.js                                                                                                                                                                                    ─╯
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

## Gemini 1.5 Flash-8B is a small model designed for lower intelligence tasks. Fastest model (ideal for chat).

![image](https://github.com/user-attachments/assets/1355ae28-1a44-42c9-ae39-642cbaeb4455)

