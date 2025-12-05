import { genkit } from "genkit";
import { googleAI, gemini15Flash } from "@genkit-ai/googleai";
import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Initialize Genkit
const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // Set default model
});

// Export the AI instance for use in other modules
export { ai };

// Basic health check function
export const healthCheck = onCall({ cors: true }, async () => {
  logger.info("Health check called");
  return { status: "ok", timestamp: new Date().toISOString() };
});
