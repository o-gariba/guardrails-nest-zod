
import { AiProvider } from '../../src/modules/safer-rag/ai-provider.interface';

export const mockOpenAIResponse = (content: string) => content;

export const AiProviderMock = {
  provide: AiProvider,
  useValue: {
    generateJson: jest.fn(),
  },
};
