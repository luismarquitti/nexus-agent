import { z } from "zod";

/**
 * Input schema for the chatFlow.
 * Defines the expected payload from the client.
 */
export const ChatInputSchema = z.object({
  message: z.string().describe("The user's message to the agent"),
  history: z.array(
    z.object({
      role: z.enum(["user", "model"]),
      content: z.string(),
    })
  ).optional().describe("Previous conversation history provided by client (if stateless)"),
});

/**
 * Output schema for the chatFlow.
 * Defines the structure returned to the client.
 */
export const ChatOutputSchema = z.string().describe("The agent's text response");

/**
 * Input schema for saveNote tool.
 */
export const SaveNoteInputSchema = z.object({
  content: z.string().describe("The content of the note to remember"),
});

/**
 * Input schema for searchNotes tool.
 */
export const SearchNotesInputSchema = z.object({
  query: z.string().describe("The search query to find relevant notes"),
});