
import { Injectable, Inject } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiProvider } from './ai-provider.interface';

@Injectable()
export class GeminiProvider implements AiProvider {
    constructor(@Inject('GoogleGenerativeAI') private readonly genAI: GoogleGenerativeAI) { }

    async generateJson(prompt: string): Promise<string> {
        const model = this.genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            generationConfig: {
                responseMimeType: 'application/json',
            },
        });

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        if (!text) {
            throw new Error('Nenhum conteúdo recebido do LLM.');
        }
        return text;
    }
}
