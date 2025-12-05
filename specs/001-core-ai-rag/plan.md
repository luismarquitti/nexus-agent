# Implementation Plan: Core AI Engine & RAG

**Branch**: `001-core-ai-rag` | **Date**: 2025-12-04 | **Spec**: [specs/001-core-ai-rag/spec.md](specs/001-core-ai-rag/spec.md)
**Input**: Feature specification from `specs/001-core-ai-rag/spec.md`

## Summary

Implement the core conversational "brain" of Nexus AI using Firebase Genkit. This includes a `chatFlow` for handling user interactions with the Gemini LLM and a RAG (Retrieval-Augmented Generation) system using Firestore Vector Search to persist and retrieve long-term memory (notes).

## Technical Context

**Language/Version**: TypeScript (Node.js 24 via `apps/functions` engine)
**Primary Dependencies**: `@genkit-ai/ai`, `@genkit-ai/firebase`, `@genkit-ai/googleai`, `firebase-admin`, `firebase-functions`
**Storage**: Firebase Firestore (Structured data for chat history, Vector Search for RAG)
**Testing**: `firebase-functions-test` (Unit/Integration)
**Target Platform**: Google Cloud Functions (2nd Gen)
**Project Type**: Monorepo (Web + Functions)
**Performance Goals**: Chat latency < 5s, Vector Search < 500ms
**Constraints**: Must operate within Firebase Free Tier limits where possible (Vector search may have costs, monitored)

## Constitution Check

*GATE: Must pass before Phase 0 research.*

- **Cloud-Native & Free Tier First**: ✅ Uses Cloud Functions and Firestore.
- **Modularity**: ✅ Chat and Memory implemented as Genkit Flows/Tools.
- **Separation of Concerns**: ✅ Backend logic isolated in `apps/functions`.
- **Type Safety**: ✅ TypeScript enforced.
- **Agile**: ✅ Focused on specific User Stories (Chat, RAG).

## Project Structure

### Documentation (this feature)

```text
specs/001-core-ai-rag/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
apps/functions/src/
├── index.ts            # Entry point, exports flows
├── flows/
│   └── chat.ts         # chatFlow definition
├── tools/
│   └── memory.ts       # saveNote and searchNotes tools
└── data/
    └── firestore.ts    # Firestore helpers (if needed)
```

**Structure Decision**: Following the existing `apps/functions` structure, adding folder organization for `flows` and `tools` to maintain modularity per Constitution Principle II.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None      | N/A        | N/A                                 |