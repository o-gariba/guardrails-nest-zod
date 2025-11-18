
import { Injectable } from '@nestjs/common';
import { AiProvider } from './ai-provider.interface';

@Injectable()
export class MockProvider implements AiProvider {
  async generateJson(prompt: string): Promise<string> {
    console.log(`MockProvider recebeu o prompt: ${prompt}`);
    const mockResponse = {
      joke: 'Esta é uma piada mock.',
      punchline: 'Esta é uma punchline mock.',
    };
    return JSON.stringify(mockResponse);
  }
}
