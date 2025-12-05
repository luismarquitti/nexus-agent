---
name: Nexus AI Project Roadmap
description: High Level Roadmap for the Nexus AI Project
version: 1.0.0
author: @luismarquitti
last_updated: 2025-12-04 - 21:26h
---

# Project Roadmap

This document tracks the high-level progress of the Nexus AI project.

## 🚀 Epic 1: Foundation and Infrastructure

**Status**: 🟢 Completed
**Goal**: Establish the development environment, repository, and basic cloud infrastructure.

- [x] **Repository Setup**: Initialize monorepo with NPM Workspaces.
- [x] **Backend Structure**: Configure Genkit structure in `apps/functions`.
- [x] **Frontend Structure**: Initialize Next.js in `apps/web`.
- [x] **Cloud Setup**: Create GCP project, enable APIs, and initialize Firebase.
- [x] **Linting & Config**: Configure shared ESLint, Prettier, and TypeScript config.
- [x] **Auth**: Configure Firebase Authentication.

## 🧠 Epic 2: Core AI Engine & RAG

**Status**: 🔴 Not Started
**Goal**: Implement the agent's "brain", capable of conversing, maintaining memory, and retrieving information.

- [ ] **Chat Flow**: Implement `chatFlow` endpoint using Genkit.
- [ ] **Memory**: Configure chat history persistence in Firestore.
- [ ] **RAG**: Enable Vector Search and implement `saveNote`/`searchNotes` tools.
- [ ] **Context**: Implement context injection logic.

## 🔌 Epic 3: Integration Modules - Workspace

**Status**: 🔴 Not Started
**Goal**: Connect the agent to the real world (Google Calendar and Gmail).

- [ ] **Calendar**: Configure OAuth and implement `listEvents`/`createEvent` tools.
- [ ] **Email**: Configure Gmail OAuth and implement `fetchUnreadEmails` tool.

## 💻 Epic 4: Frontend Dashboard Experience

**Status**: 🔴 Not Started
**Goal**: Create the visual interface where the user interacts with the data.

- [ ] **Layout**: Create responsive layout with Sidebar.
- [ ] **Widgets**: Create "Agenda" and "Email Summary" widgets.
- [ ] **Chat UI**: Implement interactive chat component with Markdown support.

## 💰 Epic 5: Extensibility & Financial Module

**Status**: 🔴 Not Started
**Goal**: Prove modularity by adding a financial agent.

- [ ] **Finance Module**: Create isolated `financeModule.ts`.
- [ ] **Tools**: Register financial tools and validate complex queries.
