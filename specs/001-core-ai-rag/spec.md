# Feature Specification: Core AI Engine & RAG

**Feature Branch**: `001-core-ai-rag`  
**Created**: 2025-12-04  
**Status**: Draft  
**Input**: User description: "Implement Core AI Engine & RAG (Epic 2)"

## Clarifications

### Session 2025-12-04
- Q: Should the system support a single continuous chat history or multiple distinct conversation threads per user? → A: Multiple threads (Option B).
- Q: How should the RAG retrieval be triggered? → A: Agentic/Tool Use (Option A) - LLM decides when to search.
- Q: How should user notes be saved and associated with the RAG system? → A: Explicit Note Saving (Option A) - via a `saveNote` tool.
- Q: Should users be able to list, edit, or delete saved notes in this MVP? → A: No (Only save notes).
- Q: What strategy should be used for determining the 'relevance' of notes for RAG and how many to retrieve? → A: Dynamic similarity score and fixed note count (Option B).

## User Scenarios & Testing

### User Story 1 - Basic Chat Flow (Priority: P1)

As a user, I want to converse with the agent via an API so that I can receive intelligent answers and validate the AI connection.

**Why this priority**: This is the fundamental interaction layer; without it, no other features can be accessed conversationally.

**Independent Test**: Can be fully tested by sending a text message to the endpoint and verifying a coherent text response is returned.

**Acceptance Scenarios**:

1. **Given** the agent is online, **When** I send a "Hello" message, **Then** I receive a coherent greeting response.
2. **Given** the agent is connected to the LLM, **When** I ask a general knowledge question, **Then** I receive a correct and relevant answer.

---

### User Story 2 - Context Persistence (Priority: P2)

As a user, I want the agent to remember what we just discussed so that I can have a continuous, natural conversation without repeating context.

**Why this priority**: Essential for usability; single-turn interactions are insufficient for an assistant.

**Independent Test**: Send a fact in message A, then ask about it in message B.

**Acceptance Scenarios**:

1. **Given** I have told the agent "My name is Luis", **When** I ask "What is my name?" in the next turn, **Then** the agent answers "Luis".
2. **Given** a conversation history, **When** a new message is sent, **Then** the history is updated with the new exchange.
3. **Given** multiple chat sessions, **When** I switch to a previous session, **Then** the context is restored specifically for that session.

---

### User Story 3 - Long-term Memory (RAG) (Priority: P3)

As a user, I want the agent to remember notes and information I explicitly save so that responses are personalized based on my accumulated knowledge.

**Why this priority**: Differentiates the agent from a generic LLM by adding personal state.

**Independent Test**: Save a unique piece of information (e.g., a code), clear session context, then ask about the information.

**Acceptance Scenarios**:

1. **Given** I have used the tool to save a note "The door code is 9988", **When** I ask "What is the door code?" in a fresh session, **Then** the agent retrieves the note and answers "9988".
2. **Given** a user query, **When** relevant notes exist, **Then** the system identifies and retrieves them via vector similarity.
3. **Given** a query requiring memory, **When** the agent determines need, **Then** it autonomously calls the search tool.

---

### Edge Cases

- What happens when the LLM service is unavailable? (Should return a graceful error).
- What happens when no relevant notes are found for a query? (Should answer based on general knowledge only).
- How does the system handle extremely long conversation histories? (Should truncate or summarize to fit context window).

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide a conversational interface API to receive user messages and return responses.
- **FR-002**: System MUST generate responses using a generative AI model.
- **FR-003**: System MUST persist chat message history for the current session.
- **FR-004**: System MUST provide a tool/capability to save unstructured text notes.
- **FR-005**: System MUST generate vector embeddings for saved notes.
- **FR-006**: System MUST store notes and their embeddings in a searchable database.
- **FR-007**: System MUST perform vector similarity search to retrieve notes relevant to the current user query.
- **FR-008**: System MUST inject retrieved notes into the AI context (System Prompt) before generating a response.
- **FR-009**: System MUST support creation and management of multiple distinct chat sessions per user.
- **FR-010**: The agent MUST autonomously decide when to execute a search for notes based on user intent (Tool Use pattern).
- **FR-011**: User notes will be explicitly saved via a dedicated `saveNote` tool call.
- **FR-012**: The MVP will only support saving and retrieving notes; listing, editing, or deleting notes is out of scope.
- **FR-013**: The system MUST use a dynamic similarity score and retrieve a fixed maximum number of notes (e.g., top 3) to determine relevance for RAG.

### Key Entities

- **ChatMessage**: Represents a single turn in the conversation (User or Agent), including content and timestamp.
- **Note**: A piece of knowledge saved by the user, containing the text content and its vector embedding.
- **ChatSession**: Represents a distinct conversation thread with its own history and metadata.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users receive a response to simple chat messages within 5 seconds (latency target).
- **SC-002**: The agent correctly answers questions based on information provided in the previous 3 turns of conversation (Context Recall).
- **SC-003**: The agent correctly retrieves and answers questions based on a specific note saved >1 hour ago (Long-term Recall).
- **SC-004**: System successfully handles concurrent chat sessions without data leakage between users.
