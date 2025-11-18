
import { Test, TestingModule } from '@nestjs/testing';
import { SafeRAGService } from '../../../src/modules/safer-rag/safer-rag.service';
import { z } from 'zod';
import { AiProviderMock } from '../../mocks/openai.mock';
import { AiProvider } from '../../../src/modules/safer-rag/ai-provider.interface';

describe('SafeRAGService', () => {
  let service: SafeRAGService;
  let aiProvider: AiProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SafeRAGService, AiProviderMock],
    }).compile();

    service = module.get<SafeRAGService>(SafeRAGService);
    aiProvider = module.get<AiProvider>(AiProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSafeResponse', () => {
    const prompt = 'Tell me a joke.';
    const JokeSchema = z.object({
      joke: z.string(),
      punchline: z.string(),
    });

    it('should return a valid response when the AI returns a valid JSON', async () => {
      const mockResponse = {
        joke: 'Why did the scarecrow win an award?',
        punchline: 'Because he was outstanding in his field.',
      };
      (aiProvider.generateJson as jest.Mock).mockResolvedValue(
        JSON.stringify(mockResponse),
      );

      const response = await service.getSafeResponse(prompt, JokeSchema);

      expect(response).toEqual(mockResponse);
      expect(aiProvider.generateJson).toHaveBeenCalledWith(prompt);
    });

    it('should throw an error when the AI returns a JSON that does not match the Zod schema', async () => {
      const mockResponse = {
        joke: 'Why did the scarecrow win an award?',
        // Missing punchline
      };
      (aiProvider.generateJson as jest.Mock).mockResolvedValue(
        JSON.stringify(mockResponse),
      );

      await expect(service.getSafeResponse(prompt, JokeSchema)).rejects.toThrow(
        'A saída do LLM falhou na validação.',
      );
    });

    it('should throw an error when the AI returns a malformed JSON', async () => {
        (aiProvider.generateJson as jest.Mock).mockResolvedValue(
            '{"joke": "Why did the scarecrow win an award?", "punchline": "Because he was outstanding in his field."'
        );

        await expect(service.getSafeResponse(prompt, JokeSchema)).rejects.toThrow(
            'Resposta JSON inválida do LLM.',
        );
    });
  });
});
