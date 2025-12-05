---
description: "Task list for Core AI Engine & RAG implementation"
---

# Tasks: Core AI Engine & RAG

**Input**: Design documents from `specs/001-core-ai-rag/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/
**Branch**: `001-core-ai-rag`

**Tests**: Tests are included as requested by the project constitution (Type Safety & Standards).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create `apps/functions/src/flows` directory
- [ ] T002 [P] Create `apps/functions/src/tools` directory
- [ ] T003 [P] Create `apps/functions/src/data` directory
- [ ] T004 [P] Ensure `apps/functions/package.json` has required dependencies (`@genkit-ai/ai`, `@genkit-ai/firebase`, etc.)
- [ ] T005 Update `apps/functions/src/index.ts` to export flows (placeholder)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create Chat Input/Output Schemas in `apps/functions/src/data/schemas.ts` (derived from contracts)
- [ ] T007 [P] Create Note Input/Output Schemas in `apps/functions/src/data/schemas.ts`
- [ ] T008 Configure Genkit Plugins in `apps/functions/src/index.ts` (GoogleAI, Firestore)
- [ ] T009 [P] Setup Firestore collections structure verification script (manual check or simple script)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Basic Chat Flow (Priority: P1) 🎯 MVP

**Goal**: As a user, I want to converse with the agent via an API so that I can receive intelligent answers and validate the AI connection.

**Independent Test**: Can be fully tested by sending a text message to the endpoint and verifying a coherent text response is returned.

### Tests for User Story 1 (OPTIONAL)

- [ ] T010 [P] [US1] Create unit test for chatFlow in `apps/functions/src/flows/chat.spec.ts` (expect mock response)

### Implementation for User Story 1

- [ ] T011 [US1] Implement `chatFlow` definition in `apps/functions/src/flows/chat.ts`
- [ ] T012 [US1] Connect `chatFlow` to Gemini model in `apps/functions/src/flows/chat.ts`
- [ ] T013 [US1] Export `chatFlow` in `apps/functions/src/index.ts`
- [ ] T014 [US1] Verify `chatFlow` works with emulator (curl test)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Context Persistence (Priority: P2)

**Goal**: As a user, I want the agent to remember what we just discussed so that I can have a continuous, natural conversation without repeating context.

**Independent Test**: Send a fact in message A, then ask about it in message B.

### Tests for User Story 2 (OPTIONAL)

- [ ] T015 [P] [US2] Update `apps/functions/src/flows/chat.spec.ts` to test history persistence

### Implementation for User Story 2

- [ ] T016 [US2] Implement Firestore helper to save/load chat history in `apps/functions/src/data/firestore.ts`
- [ ] T017 [US2] Update `chatFlow` in `apps/functions/src/flows/chat.ts` to save user message to Firestore
- [ ] T018 [US2] Update `chatFlow` in `apps/functions/src/flows/chat.ts` to save model response to Firestore
- [ ] T019 [US2] Update `chatFlow` in `apps/functions/src/flows/chat.ts` to load history and pass to Gemini

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Long-term Memory (RAG) (Priority: P3)

**Goal**: As a user, I want the agent to remember notes and information I explicitly save so that responses are personalized based on my accumulated knowledge.

**Independent Test**: Save a unique piece of information (e.g., a code), clear session context, then ask about the information.

### Tests for User Story 3 (OPTIONAL)

- [ ] T020 [P] [US3] Create unit tests for memory tools in `apps/functions/src/tools/memory.spec.ts`

### Implementation for User Story 3

- [ ] T021 [P] [US3] Implement `saveNote` tool in `apps/functions/src/tools/memory.ts` (embedding generation + Firestore save)
- [ ] T022 [P] [US3] Implement `searchNotes` tool in `apps/functions/src/tools/memory.ts` (embedding generation + vector search)
- [ ] T023 [US3] Register memory tools in `apps/functions/src/index.ts` or `chatFlow` config
- [ ] T024 [US3] Implement RAG retrieval logic in `chatFlow` (query -> search -> context injection) in `apps/functions/src/flows/chat.ts`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T025 [P] Add logging for all AI interactions
- [ ] T026 [P] Update README.md with API documentation
- [ ] T027 Verify all `quickstart.md` scenarios pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3+)**: Depend on Foundational
- **Polish (Final Phase)**: Depends on User Stories

### User Story Dependencies

- **US1 (Chat)**: Independent start
- **US2 (Context)**: Extends US1 (depends on chatFlow existing)
- **US3 (RAG)**: Extends US1 (depends on chatFlow existing), independent of US2

### Parallel Opportunities

- Schema creation (T006, T007) can run in parallel
- Tool implementation (T021, T022) can run in parallel with US2 tasks
- Testing tasks can run in parallel with implementation

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phases 1 & 2.
2. Implement `chatFlow` (US1).
3. Validate basic chat works.

### Incremental Delivery

1. Add Persistence (US2) -> Verify history retention.
2. Add Memory Tools (US3) -> Verify saving/retrieving notes.
