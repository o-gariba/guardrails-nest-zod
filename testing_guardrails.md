# Guardrail Testing Strategy & Examples

This document outlines how to test the SafeTutor API using Jest. We use **Mocks** to simulate the AI, ensuring our code handles both helpful and harmful responses correctly.

## The Philosophy
We do not test if GPT-4 is smart. We test if **our code** correctly handles what GPT-4 gives us (Success, Failure, or Malicious intent).

## Mocking Setup (The Foundation)
Do not make real HTTP calls. Mock the OpenAI Service in NestJS.

```typescript
// test/mocks/openai.mock.ts
export const mockOpenAIResponse = (content: object) => ({
  choices: [
    {
      message: {
        content: JSON.stringify(content),
        role: 'assistant',
      },
    },
  ],
});

export const OpenAIProviderMock = {
  provide: 'OpenAI', // Or whatever token you use for DI
  useValue: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
};
