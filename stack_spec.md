# Technology Stack & Implementation Plan

## Application Layer
- **Framework:** NestJS.
- **Language:** TypeScript.
- **Validation:** Zod.

## Testing & Quality Assurance (NEW)
- **Runner:** Jest (ts-jest).
- **Mocks:** Jest native mocks (for OpenAI).
- **Red Teaming:** Custom Jest suites with adversarial payloads.

## AI & Data Layer
- **LLM Integration:** OpenAI Node SDK (with `zodResponseFormat`).
- **Vector Store:** pgvector.

## Infrastructure
- **CI/CD:** Bitrise (Running `npm test` and `gitleaks`).
