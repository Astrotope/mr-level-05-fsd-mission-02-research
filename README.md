# Google Gemini

## Google Gemini - API Key
AIzaSyCGiJs_e4yAA2Y8dJCjD_1J2cJvOfQnBpU

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
