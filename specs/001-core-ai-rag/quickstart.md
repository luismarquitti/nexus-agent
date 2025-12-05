# Quickstart: Testing Core AI Engine & RAG

## Prerequisites
1. Ensure the Firebase Emulator Suite is running:
   ```bash
   npm run serve
   ```
   *(Run this in `apps/functions`)*

## Testing `chatFlow` (CLI)

You can use the Genkit CLI or curl to test the flow.

### Via Genkit Developer UI
1. Open the Genkit UI (usually http://localhost:4000).
2. Select the `chatFlow`.
3. Enter JSON Input:
   ```json
   {
     "message": "Hello, who are you?"
   }
   ```
4. Run and observe the output.

### Via Curl (Simulating Client)

```bash
curl -X POST http://127.0.0.1:5001/[PROJECT_ID]/us-central1/chatFlow \
-H "Content-Type: application/json" \
-d '{"data": {"message": "Save this note: The secret code is 1234"}}'
```

## Verification Steps

1. **Basic Chat**: Send "Hello". Expect greeting.
2. **Save Note**: Send "Remember that my favorite color is blue".
   - Check Firestore Emulator: `users/{userId}/notes` should have a new document.
3. **RAG Recall**: Send "What is my favorite color?".
   - Expect response: "Your favorite color is blue."