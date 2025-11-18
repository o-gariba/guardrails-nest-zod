# Project Vision: SafeTutor API

## The Why
Educational institutions require AI tools that are not only intelligent but strictly safe for minors. This project bridges the gap between raw LLM capabilities and school compliance requirements using a "Defense in Depth" architecture verified by rigorous automated testing.

## Core Value Proposition
1. **Safety First:** No raw LLM output ever reaches the student without passing through validation layers.
2. **Determinism:** The application behavior is predictable and verified by comprehensive unit and integration tests.
3. **Privacy:** PII is scrubbed before processing, verified by regression tests.
4. **Auditability:** Every interaction is logged; every guardrail is unit-tested.

## Success Metrics
- **Test Coverage:** >90% on Guardrails and PII Sanitizers.
- **Zero PII Leaks:** Verified by automated "Red Teaming" test suites.
- **Schema Compliance:** 100% of responses adhere to Zod schemas.
