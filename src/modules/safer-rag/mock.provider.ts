
import { Injectable } from '@nestjs/common';
import { AiProvider } from './ai-provider.interface';

@Injectable()
export class MockProvider implements AiProvider {
  async generateJson(prompt: string): Promise<string> {
    console.log(`MockProvider recebeu o prompt: ${prompt}`);
    
    // Simula uma resposta INVÁLIDA para o endpoint /quiz (falta a resposta_correta)
    const mockResponse = {
      topico: "História",
      figura_historica: "Santos Dumont",
      pergunta: "Qual invenção é mais famosa de Santos Dumont?",
      opcoes: [
        "Telefone",
        "Lâmpada",
        "14-bis",
        "Rádio"
      ]
      // O campo "resposta_correta" está faltando de propósito para testar o guardrail.
    };

    return JSON.stringify(mockResponse);
  }
}
