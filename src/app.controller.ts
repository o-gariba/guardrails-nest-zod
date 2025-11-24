
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SafeRAGService } from './modules/safer-rag/safer-rag.service';
import { z } from 'zod';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly safeRagService: SafeRAGService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('joke')
  async getJoke() {
    const JokeSchema = z.object({
      piada: z.string(),
      punchline: z.string(),
    });
    return this.safeRagService.getSafeResponse(
      'Conte uma piada. Output deve ser um JSON com os campos: piada (string), punchline (string).',
      JokeSchema,
    );
  }

  @Get('quiz')
  async obterQuiz() {
    const SchemaQuiz = z.object({
      topico: z.string(),
      figura_historica: z.string(),
      pergunta: z.string(),
      opcoes: z.array(z.string()),
      resposta_correta: z.string(),
    });

    const prompt = `
      Gere uma pergunta de múltipla escolha sobre uma figura histórica famosa.
      A pergunta deve ser adequada para um estudante do ensino fundamental.
      A saída deve ser um JSON com os seguintes campos:
      - topico (string): O assunto geral (ex: "História", "Ciência").
      - figura_historica (string): O nome da figura histórica.
      - pergunta (string): A pergunta do quiz.
      - opcoes (array de 4 strings): As possíveis respostas.
      - resposta_correta (string): A resposta correta dentre as opções.
    `;

    return this.safeRagService.getSafeResponse(prompt, SchemaQuiz);
  }
}
