# Project Learning Map and Architecture

**Status:** In Development | **Last Class:** 12/04/2025

## 1. Stack Overview (The Ecosystem)

- **Frontend:** **Next.js 16 (React 19) + Tailwind CSS v4**.
  - _Role:_ Modern and reactive user interface. Uses the latest (Bleeding Edge) versions of React and Next.js, indicating a focus on performance and Server Components. Tailwind v4 brings the new high-performance styling engine.
- **Backend:** **Firebase Functions v2 + Genkit**.
  - _Role:_ Serverless Backend focused on AI. It is not a traditional REST API; it operates as a set of distributed and automatically scalable functions.
- **Database:** **Firestore** (Implicit in the Firebase ecosystem).
  - _Strategy:_ Document-oriented NoSQL. Ideal for flexible data and real-time synchronization.
- **DevOps/Infra:** **Firebase Hosting & Functions**.
  - _Tools:_ Monorepo managed via **npm workspaces**. Linting and shared configurations via the `@nexus/config` package.

## 2. Deep Dive: Architecture and Design Decisions

- **Folder Structure (Monorepo):**
  - The project adopts a **Monorepo** structure (`apps/*`, `packages/*`).
  - _Why?_ Allows sharing configurations (`packages/config`) and potentially business logic between the frontend (`apps/web`) and the backend (`apps/functions`) without duplicating code. Facilitates the maintenance of unified dependencies.
- **AI-First Backend (Genkit):**
  - The backend is not just a CRUD. It is initialized with **Genkit** (`@genkit-ai/*`), a Google framework for building applications with LLMs.
  - _Pattern:_ The `apps/functions/src/index.ts` file exports an `ai` instance configured with the `gemini15Flash` model. This suggests that the main business logic will revolve around AI flows (Flows) and not just data manipulation.
- **Client-Server Communication (RPC via Callable Functions):**
  - The use of `onCall` (`firebase-functions/v2/https`) indicates a **Remote Procedure Call (RPC)** pattern.
  - _Theory:_ Instead of managing REST routes (GET /api/resource), the frontend "calls" functions directly as if they were local. The Firebase SDK handles authentication and serialization, drastically simplifying the network layer.

## 3. Advanced Concepts Implemented

- **Genkit (AI Framework):**
  - _Theory:_ Framework that standardizes interaction with LLMs, supporting plugins, models, and "flows".
  - _In Code:_ `apps/functions/src/index.ts` initializes Genkit with `googleAI()` and defines the default model.
- **React 19 & Next.js 16:**
  - _Theory:_ Adoption of **React Server Components (RSC)** and possibly **Server Actions**. This moves heavy logic and rendering to the server, sending less JavaScript to the client.
  - _In Code:_ Explicit dependencies in `apps/web/package.json`.
- **Tailwind CSS v4:**
  - _Theory:_ New Tailwind architecture, based on Rust (via implicit Lightning CSS), dispensing with the complex `postcss.config.js` of previous versions and offering instant compilation.

## 4. Mental Diagram (Mermaid)

```mermaid
graph TD
    subgraph Monorepo
        Config["@nexus/config (Shared Config)"]
    end

    subgraph Frontend [apps/web]
        NextJS["Next.js 16 / React 19"]
        Tailwind["Tailwind CSS v4"]
    end

    subgraph Backend [apps/functions]
        Genkit["Genkit (AI Logic)"]
        Gemini["Gemini 1.5 Flash"]
        Firebase["Firebase Functions v2"]
    end

    Frontend -->|RPC (onCall)| Firebase
    Firebase -->|Invokes| Genkit
    Genkit -->|Uses| Gemini
    Frontend -.->|Uses| Config
    Backend -.->|Uses| Config
```

## 5. Next Study Steps

1.  **Genkit Documentation:** Understand the concept of "Flows" and how to create structured prompts.
2.  **React Server Components (RSC):** Study how Next.js 16 manages state between server and client.
3.  **Firebase Callable Functions:** Understand how authentication is automatically passed in these calls.
