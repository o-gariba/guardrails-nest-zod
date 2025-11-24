import {Injectable} from '@nestjs/common';
import {z} from 'zod';
import {AiProvider} from './ai-provider.interface';

@Injectable()
export class SafeRAGService {
    constructor(private readonly aiProvider: AiProvider) {
    }

    async getSafeResponse<T extends z.ZodType<any, any, any>>(
        prompt: string,
        schema: T,
    ): Promise<z.infer<T>> {
        const content = await this.aiProvider.generateJson(prompt);

        let parsedContent: any;
        try {
            parsedContent = JSON.parse(content);
        } catch (error) {
            console.error('Falha ao analisar a resposta do LLM:', error);
            throw new Error('Resposta JSON inválida do LLM.');
        }

        const validationResult = schema.safeParse(parsedContent);

        if (!validationResult.success) {
            console.error('A validação do Zod falhou:', validationResult.error);
            throw new Error('A saída do LLM falhou na validação.');
        }

        return validationResult.data;
    }
}
