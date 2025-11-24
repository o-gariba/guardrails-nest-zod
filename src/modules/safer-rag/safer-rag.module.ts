import { Module } from '@nestjs/common';
import { SafeRAGService } from './safer-rag.service';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiProvider } from './ai-provider.interface';
import { OpenAIProvider } from './openai.provider';
import { MockProvider } from './mock.provider';
import { GeminiProvider } from './gemini.provider';

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
      provide: 'GoogleGenerativeAI',
      useFactory: () => {
        return new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
      },
    },
    {
      provide: AiProvider,
      useClass:
        process.env.AI_PROVIDER === 'mock'
          ? MockProvider
          : process.env.AI_PROVIDER === 'gemini'
            ? GeminiProvider
            : OpenAIProvider,
    },
  ],
  exports: [SafeRAGService],
})
export class SaferRagModule { }
