
import { Module } from '@nestjs/common';
import { SafeRAGService } from './safer-rag.service';
import OpenAI from 'openai';
import { AiProvider } from './ai-provider.interface';
import { OpenAIProvider } from './openai.provider';
import { MockProvider } from './mock.provider';

@Module({
  providers: [
    SafeRAGService,
    {
      provide: 'OpenAI',
      useFactory: () => {
        return new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
      },
    },
    {
      provide: AiProvider,
      useClass:
        process.env.AI_PROVIDER === 'mock' ? MockProvider : OpenAIProvider,
    },
  ],
  exports: [SafeRAGService],
})
export class SaferRagModule {}
