# AI Interview Assistant Function Documentation

## Existing Functions

### processInterviewInteraction
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

### analyzeInterview
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

## New Functions

### formatMessageHistory
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

### validateInterviewRequest
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

### validateAnalysisRequest
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

### createSystemInstruction
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

### processAIResponse
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

### initializeAIModel
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

### formatAPIResponse
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

### handleStreamResponse
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

### validateJobTitle
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

### validateMessageHistory
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
