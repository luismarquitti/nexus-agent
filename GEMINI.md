# Nexus AI Project Context

## 📋 Project Overview

Nexus AI is a modular intelligent agent designed to centralize personal and professional management. It leverages Google Gemini and Firebase Genkit to orchestrate tasks, manage schedules, and provide financial advice. The architecture is modular, allowing new domains to be added as plugins.

### Core Architecture
- **Monorepo:** NPM Workspaces managing `apps` and `packages`.
- **Frontend:** Next.js (React) with Tailwind CSS and Shadcn/UI.
- **Backend:** Firebase Cloud Functions (2nd Gen) using Genkit.
- **AI/LLM:** Google Gemini (via Vertex AI/Genkit).
- **Database:** Firebase Firestore (with Vector Search for RAG).

## 📂 Directory Structure

```
F:\workspace\nexus_agent\
├── apps\
│   ├── functions\      # Backend: Firebase Functions & Genkit
│   └── web\            # Frontend: Next.js application
├── packages\
│   └── config\         # Shared configurations (ESLint, TSConfig)
├── .specify\           # Workflow templates and scripts
├── firebase.json       # Firebase configuration
└── project-roadmap.md  # Project status and roadmap
```

## 🛠 Building and Running

### Prerequisites
- Node.js (v20+ recommended, v24 specified in functions)
- Firebase CLI
- Google Cloud SDK (for some operations)

### Key Commands

**Root**
- Install dependencies: `npm install`

**Frontend (`apps/web`)**
- Development server: `npm run dev`
- Build: `npm run build`
- Start production server: `npm run start`
- Lint: `npm run lint`

**Backend (`apps/functions`)**
- Build TypeScript: `npm run build`
- Start Emulators: `npm run serve` (Builds and starts Firebase emulators)
- Deploy: `npm run deploy`
- Logs: `npm run logs`

## 💻 Development Conventions

### Architecture & Patterns
- **Modularity:** New capabilities (e.g., Finance, Health) must be implemented as isolated modules in `functions/src/modules/`.
- **Tool Definition:** Use `ai.defineTool` from Genkit to expose functionality to the LLM.
- **Separation of Concerns:**
    - **Backend:** Handles reasoning, tool execution, and data retrieval.
    - **Frontend:** Handles visualization and user input.

### Coding Standards
- **Language:** TypeScript throughout the stack.
- **Styling:** Tailwind CSS for the frontend.
- **Linting:** ESLint is configured; ensure no lint errors before committing.
- **Configuration:** Shared configurations are located in `packages/config`.

### Roadmap Status
- **Current Focus:** Epic 2: Core AI Engine & RAG.
- **Next Steps:** Implement `chatFlow`, Firestore memory persistence, and RAG tools (`saveNote`, `searchNotes`).

## 📄 Reference Files
- `README.md`: General project documentation.
- `project-roadmap.md`: Detailed feature roadmap and status.
- `apps/functions/package.json`: Backend dependencies and scripts.
- `apps/web/package.json`: Frontend dependencies and scripts.
