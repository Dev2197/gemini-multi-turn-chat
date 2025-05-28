# Gemini Chat Console Application

A simple interactive chatbot using the Google Gemini API. This console application allows you to have a multi-turn conversation with Gemini while maintaining context across messages.

## Features

- Interactive console-based chat with Gemini
- Maintains conversation context across messages
- Configurable temperature parameter to control response creativity
- Support for extended conversations beyond the initial two turns

## Prerequisites

- Node.js installed on your system
- Google Gemini API key

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install @google/generative-ai dotenv readline-sync
   ```
3. Create a `.env` file in the project root and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## Running the Script

1. Open a terminal in the project directory
2. Run the script:
   ```bash
   node gemini_chat.js
   ```
3. Follow the prompts:
   - Set temperature (0.0 to 1.9, default 0.7)
   - Enter your first message
   - Enter your second message
   - Choose to continue the conversation if user wants to

## Dependencies

- @google/generative-ai: Google's Generative AI library
- dotenv: For loading environment variables
- readline-sync: For synchronous console input
