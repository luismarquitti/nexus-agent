# Data Model: Core AI Engine & RAG

## Firestore Collections

### 1. `users` (Existing/Implicit)
- **Path**: `users/{userId}`
- **Description**: Root document for user data.

### 2. `chats`
- **Path**: `users/{userId}/chats/{chatId}`
- **Description**: Metadata for a conversation session.
- **Fields**:
  - `createdAt` (Timestamp): When the chat started.
  - `updatedAt` (Timestamp): Last message time.
  - `title` (String): Summary/title of chat (optional).

### 3. `messages`
- **Path**: `users/{userId}/chats/{chatId}/messages/{messageId}`
- **Description**: Individual messages in a chat flow.
- **Fields**:
  - `role` (String): 'user' | 'model' | 'system'
  - `content` (String): Text content of the message.
  - `timestamp` (Timestamp): When the message was sent/generated.

### 4. `notes` (Memory)
- **Path**: `users/{userId}/notes/{noteId}`
- **Description**: Long-term memory storage with vector embeddings.
- **Fields**:
  - `content` (String): The raw text of the note.
  - `embedding` (Vector<768>): The vector representation of `content`.
  - `createdAt` (Timestamp): Creation date.
  - `tags` (Array<String>): Optional tags for filtering.

## Vector Index Configuration

- **Collection**: `notes`
- **Field**: `embedding`
- **Dimension**: 768 (matching `text-embedding-004`)
- **Distance Metric**: Cosine Similarity