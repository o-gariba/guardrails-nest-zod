# Technical Guidelines & Architecture Principles

## 1. Testing Culture (Non-Negotiable)
- **TDD First:** Write the test for the guardrail *before* writing the prompt.
- **Mock the AI:** Never call the real OpenAI API in unit tests. Use Jest mocks to simulate both "Good" and "Malicious" AI responses.
- **Red Teaming Suites:** Create specific test files (`*.jailbreak.spec.ts`) that intentionally attack the system with adversarial prompts.

## 2. Type Safety & Validation
- **Zod Everywhere:** Use Zod for API DTOs, LLM Output Parsing, and *Test Assertions*.
- **Strict TypeScript:** No `any`.

## 3. Security (Defense in Depth)
- **Input Sanitization:** Remove PII before the prompt reaches the LLM context window.
- **Output Validation:** If the LLM output fails the Zod Schema, the system must throw a safe error, never leaking the raw hallucination.

## 4. DevOps
- **CI Pipeline:** `Lint` -> `Test (Unit + Guardrails)` -> `Gitleaks` -> `Build`.
