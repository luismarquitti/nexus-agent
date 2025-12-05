# Research: Core AI Engine & RAG

**Feature**: Core AI Engine & RAG
**Date**: 2025-12-04

## Decisions & Rationale

### 1. AI Runtime: Firebase Genkit
- **Decision**: Use Firebase Genkit as the orchestration framework.
- **Rationale**: Native integration with Firebase Functions and Google Cloud. Provides built-in abstractions for Flows, Tools, and LLM adapters (Google Gemini), simplifying the "plumbing" required for a RAG agent.
- **Alternatives**: LangChain (Too heavy/generic), Manual API calls (Too much boilerplate).

### 2. Vector Database: Firestore Vector Search
- **Decision**: Use Firestore's native Vector Search capabilities.
- **Rationale**: Keeps the stack consolidated in Firebase. No need to provision an external vector DB like Pinecone or Milvus, reducing complexity and latency.
- **Considerations**: Requires creating a vector index on the Firestore collection.

### 3. Embedding Model: `text-embedding-004`
- **Decision**: Use Google's `text-embedding-004`.
- **Rationale**: Standard recommendation for Gemini ecosystem. Good balance of performance and dimensionality for semantic search.

### 4. Chat History Persistence
- **Decision**: Persist chat history in a `chats/{chatId}/messages` subcollection.
- **Rationale**: Scalable pattern. Genkit can handle session state, but explicit Firestore storage allows for "Long-term" conversation history retrieval and analysis if needed later, satisfying User Story 2.

## Integration Patterns

### Context Injection (RAG)
- **Pattern**: Retrieve -> Augment -> Generate.
- **Flow**:
  1. User sends message.
  2. `chatFlow` receives message.
  3. (Optional) Convert message to query embedding.
  4. Search `notes` collection for similar embeddings.
  5. Retrieve top-K notes.
  6. Append notes to the System Prompt (context window).
  7. Call Gemini with Message + Context.