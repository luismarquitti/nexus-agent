# Nexus AI - Personal & Professional Assistant

## 📋 Project Overview

Nexus AI is a modular intelligent agent designed to centralize the user's personal and professional life. It acts as a task orchestrator, schedule manager, email reader, and financial advisor, utilizing state-of-the-art Generative AI (Google Gemini) and Serverless architecture.

The main differentiator of Nexus is its Tool-Use based Modular Architecture, allowing new knowledge domains (e.g., Financial, Health, Studies) to be attached as plugins without altering the system's core.

---

## 🛠 Tech Stack & Architecture

### Core Technologies

- **AI Runtime**: [Firebase Genkit](https://firebase.google.com/docs/genkit) (TypeScript)
- **LLM**: Google Gemini 1.5 Flash (Priority: Performance/Cost) & Pro (Complex analysis)
- **Backend**: Google Cloud Functions (2nd Gen) / Node.js
- **Frontend**: Next.js (React), Tailwind CSS, Shadcn/UI
- **Database**: Firebase Firestore (Structured data) + Firestore Vector Search (RAG)
- **Auth**: Firebase Authentication

### Design Principles

1.  **Cloud-Native & Free Tier First**: Optimized to run within GCP/Firebase free limits.
2.  **Modularity**: Each domain (Calendar, Financial) is an isolated module that exports Tools.
3.  **Separation of Concerns**: Backend (Reasoning/Tools) separated from Frontend (Visualization/Input).

---

## 📅 Agile Development Plan

This roadmap follows the Agile methodology, organized into Epics, User Stories, and Technical Tasks.

### 🚀 Epic 1: Foundation and Infrastructure (Sprint 1-2)

**Objective**: Establish the development environment, repository, and basic cloud infrastructure.

**US-1.1: Monorepo and Local Environment Setup**

- _As a developer,_
- _I want a repository configured with separation between web and functions,_
- _To start development in an organized way._
  - Task: Initialize repo with Turborepo or NPM Workspaces.
  - Task: Configure Next.js (Web) and Genkit structure (Backend).
  - Task: Configure ESLint, Prettier, and shared TypeScript `tsconfig.json`.

**US-1.2: Cloud Configuration (GCP/Firebase)**

- _As a developer,_
- _I want cloud services provisioned,_
- _To deploy the first functions._
  - Task: Create project on Google Cloud Platform and enable APIs (Vertex AI, Firestore).
  - Task: Initialize Firebase project and configure Blaze plan (required for Functions, but with free tier).
  - Task: Configure Firebase Auth (Google Provider).

### 🧠 Epic 2: Core AI Engine & RAG (Sprint 3-4)

**Objective**: Implement the agent's "brain", capable of conversing, maintaining memory, and retrieving information.

**US-2.1: Basic Chat Flow with Genkit**

- _As a user,_
- _I want to chat with the agent via API,_
- _To validate the connection with Gemini._
  - Task: Implement `chatFlow` endpoint using Genkit.
  - Task: Configure simple chat history persistence in Firestore.

**US-2.2: Memory System and RAG (Retrieval-Augmented Generation)**

- _As a user,_
- _I want the agent to remember past notes,_
- _So that responses are personalized._
  - Task: Enable Vector Search in Firestore.
  - Task: Create `saveNote` Tool: Receives text, generates embedding (model: text-embedding-004) and saves.
  - Task: Create `searchNotes` Tool: Vector search by similarity.
  - Task: Implement context injection logic in the system prompt.

### 🔌 Epic 3: Integration Modules - Workspace (Sprint 5-6)

**Objective**: Connect the agent to the real world (Google Calendar and Gmail).

**US-3.1: Calendar Module**

- _As a user,_
- _I want to know my appointments for the day,_
- _To organize myself better._
  - Task: Configure OAuth 2.0 Scopes for Google Calendar.
  - Task: Develop `calendarModule.ts` in Genkit.
  - Task: Implement `listEvents(startDate, endDate)` Tool.
  - Task: Implement `createEvent(title, time)` Tool.

**US-3.2: Email Module**

- _As a user,_
- _I want a summary of important emails,_
- _To save time._
  - Task: Configure OAuth Scopes for Gmail (Read-only initially).
  - Task: Implement `fetchUnreadEmails(limit)` Tool.
  - Task: Optimize prompt to summarize long email threads.

### 💻 Epic 4: Frontend Dashboard Experience (Sprint 7-8)

**Objective**: Create the visual interface where the user interacts with the data.

**US-4.1: Main Dashboard**

- _As a user,_
- _I want to see a panel with a summary of the day,_
- _To have quick access to information without typing._
  - Task: Create responsive layout with Sidebar and Main Content.
  - Task: Create "Agenda of the Day" Widget (consumes agent API).
  - Task: Create "Email Summary" Widget.

**US-4.2: Interactive Chat Interface**

- _As a user,_
- _I want a persistent chat on the side or overlay,_
- _To request new tasks at any time._
  - Task: Chat Component with Markdown support.
  - Task: "Loading" and "Tool Use" indicators (show when the agent is consulting the agenda).

### 💰 Epic 5: Extensibility & Financial Module (Sprint 9)

**Objective**: Prove modularity by adding a financial agent to the existing system.

**US-5.1: Financial Module Integration**

- _As a user,_
- _I want to consult accounts payable in the same interface,_
- _To consolidate my personal management._
  - Task: Create isolated `financeModule.ts` file.
  - Task: Implement Mock Data or Real Integration (e.g., read CSV or banking API).
  - Task: Register `financeTools` in the main Genkit plugin array.
  - Task: Validate complex query: "Which bills are due in the week I have a meeting with Client X?".

---

## 🧩 Module Development Guide

To add a new capability (e.g., Health Tracker) to Nexus:

1.  Create a new file in `/functions/src/modules/health.ts`.
2.  Define your tools using `ai.defineTool`.
    ```typescript
    export const logWorkout = ai.defineTool( ... );
    export const getCalories = ai.defineTool( ... );
    ```
3.  Import and register in the main `index.ts` file:
    ```typescript
    configureGenkit({
      plugins: [..., healthModule],
      // ...
    });
    ```
4.  The LLM model will automatically discover the new tools on the next deploy.

---

## 🚦 Getting Started

1.  Clone the repo: `git clone ...`
2.  Install dependencies: `npm install` (in the root).
3.  Configuration: Copy `.env.example` to `.env` and fill in the Google Cloud keys.
4.  Local Emulator:
    ```bash
    npm run genkit:start
    ```
5.  Frontend:
    ```bash
    cd web && npm run dev
    ```
