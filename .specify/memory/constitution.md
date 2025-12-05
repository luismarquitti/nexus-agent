<!--
Sync Impact Report:
- Version change: Template -> 1.0.0
- Principles Defined:
  - I. Cloud-Native & Free Tier First
  - II. Modularity & Tool-Use
  - III. Separation of Concerns
  - IV. Type Safety & Standards
  - V. Agile & Iterative
- Templates Status:
  - .specify/templates/plan-template.md: ✅ Compatible (Generic Gates)
  - .specify/templates/spec-template.md: ✅ Compatible
  - .specify/templates/tasks-template.md: ✅ Compatible
-->
# Nexus AI Constitution

## Core Principles

### I. Cloud-Native & Free Tier First
Architecture must be optimized to run within GCP/Firebase free tier limits. Stateless functions are preferred over always-on servers to ensure cost-efficiency. All architectural decisions must prioritize low-cost, serverless solutions (e.g., Cloud Functions 2nd Gen) unless performance requirements strictly dictate otherwise.

### II. Modularity & Tool-Use
Capabilities must be implemented as isolated modules (plugins) that export Tools for the AI. New knowledge domains (e.g., Finance, Health) must attach as plugins without altering the core system logic or requiring a full system redeploy. Each module should be self-contained with its own tool definitions.

### III. Separation of Concerns
Strict separation must be maintained between Backend (Reasoning, Tool Execution, Data) and Frontend (Visualization, User Input). The Backend exposes capabilities via API or Genkit flows, while the Frontend focuses solely on user experience and data presentation. No business logic should leak into UI components.

### IV. Type Safety & Standards
TypeScript is mandatory across the full stack (Backend and Frontend). Shared configurations (ESLint, Prettier, TSConfig) located in `packages/config` must be respected. usage of `any` is strictly prohibited without explicit, written justification. Data structures must be defined with Zod schemas or strict Interfaces.

### V. Agile & Iterative
Development follows Agile methodology, organized into Epics, User Stories, and Tasks. Every feature must be traced back to a User Story with clear acceptance criteria. Features should be delivered in small, testable increments (MVP approach) rather than monolithic releases.

## Security & Data Integrity

### Data Privacy
User data (notes, financial records, etc.) must be stored securely in Firestore with appropriate security rules. Vector embeddings for RAG must be handled with the same security level as raw text.

### Authentication
All distinct modules and API endpoints must verify user authentication via Firebase Auth. No public access to agent capabilities is allowed unless explicitly scoped for public usage.

## Development Workflow

### Feature Lifecycle
1.  **Spec**: Define the User Story and Requirements in a specification.
2.  **Plan**: Assess technical impact and dependencies.
3.  **Task**: Break down into atomic, testable tasks.
4.  **Implement**: Write code following TDD where applicable.
5.  **Verify**: Run tests and linting before merging.

### Quality Gates
-   **Linting**: Must pass standard ESLint rules.
-   **Testing**: Critical logic (especially AI Tools and Reasoning) must have unit tests.
-   **Review**: Code must be reviewed against this constitution.

## Governance

### Supremacy
This Constitution supersedes all other project practices. In cases of conflict between a generic best practice and this document, this document prevails.

### Amendments
Amendments to this Constitution require a Pull Request with a clear "Why" explanation.
-   **Major Version**: Changing a Core Principle.
-   **Minor Version**: Adding a new Principle or Guideline.
-   **Patch Version**: Clarifications or formatting.

All Pull Requests must verify compliance with the current Constitution before merge.

**Version**: 1.0.0 | **Ratified**: 2025-12-04 | **Last Amended**: 2025-12-04