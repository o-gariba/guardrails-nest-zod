
import { Injectable, Inject } from '@nestjs/common';
import OpenAI from 'openai';
import { AiProvider } from './ai-provider.interface';

@Injectable()
export class OpenAIProvider implements AiProvider {
  constructor(@Inject('OpenAI') private readonly openai: OpenAI) {}

  async generateJson(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente prestativo. Responda em formato JSON que adere ao esquema Zod fornecido.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Nenhum conteúdo recebido do LLM.');
    }
    return content;
  }
}
