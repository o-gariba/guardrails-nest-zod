
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SafeRAGService } from './modules/safer-rag/safer-rag.service';
import { z } from 'zod';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly safeRagService: SafeRAGService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('joke')
  async getJoke() {
    const JokeSchema = z.object({
      joke: z.string(),
      punchline: z.string(),
    });
    return this.safeRagService.getSafeResponse('Tell me a joke', JokeSchema);
  }
}
