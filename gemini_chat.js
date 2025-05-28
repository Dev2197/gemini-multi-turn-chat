const genai = require("@google/generative-ai");
const readlineSync = require("readline-sync");
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ API key not found. Set GEMINI_API_KEY in your .env file.");
  process.exit(1);
}

// Initialize Gemini client
const genAI = new genai.GoogleGenerativeAI(apiKey);

// Get and validate temperature setting from user
console.log("\nSet the temperature parameter (controls response creativity):");
let temperature = 0.7;
while (true) {
  const input = readlineSync.question(
    "Enter temperature (0.0 to 1.9, default 0.7): "
  );

  // Use default if no input
  if (!input) {
    break;
  }

  const tempValue = parseFloat(input);
  if (isNaN(tempValue)) {
    console.log("❌ Please enter a valid number");
    continue;
  }

  if (tempValue < 0.0 || tempValue > 1.9) {
    console.log("❌ Temperature must be between 0.0 and 1.9");
    continue;
  }

  temperature = tempValue;
  break;
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: temperature,
  },
});

// Start a chat session
const chat = model.startChat();

const runChat = async () => {
  // First message
  console.log("\nEnter your first message:");
  const input1 = readlineSync.question("> ");
  await chat.sendMessage(input1);

  // Second message
  console.log("\nEnter your second message:");
  const input2 = readlineSync.question("> ");
  let result = await chat.sendMessage(input2);

  // Continue conversation if user wants to
  let shouldContinue;
  while (true) {
    const answer = readlineSync
      .question("\nWould you like to continue the conversation? (yes/no): ")
      .toLowerCase();
    if (answer === "yes" || answer === "y") {
      shouldContinue = true;
      break;
    } else if (answer === "no" || answer === "n") {
      shouldContinue = false;
      break;
    } else {
      console.log("❌ Please enter 'yes' or 'no'.");
    }
  }

  if (shouldContinue) {
    console.log("\n--- Continuing chat session (type 'exit' to end) ---");
    let turnCount = 3;

    while (true) {
      console.log(`\nType your next message (${turnCount}) or 'exit' to quit:`);

      const input = readlineSync.question("> ");

      if (input.toLowerCase() === "exit") {
        break;
      }

      result = await chat.sendMessage(input);
      turnCount++;
    }
  }

  // Final response
  console.log(result.response.text());
};

runChat();
