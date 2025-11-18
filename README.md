
# SafeTutor API

## O que é o SafeTutor API?

O SafeTutor API é um projeto de back-end construído com NestJS que serve como uma camada de segurança e controle para interações com grandes modelos de linguagem (LLMs), como o GPT-4 da OpenAI. O objetivo principal é fornecer uma API segura para aplicações educacionais voltadas para o público infanto-juvenil, garantindo que as respostas da IA sejam sempre apropriadas e validadas.

O projeto utiliza uma arquitetura de "Defesa em Profundidade", onde cada interação com a IA passa por múltiplas camadas de validação, garantindo segurança, determinismo e privacidade.

## Como configurar e executar o projeto

O projeto é totalmente containerizado com Docker, o que simplifica a configuração e execução.

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Passos para execução

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```

2.  **Configure as variáveis de ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Abra o arquivo `.env` e insira sua chave da API da OpenAI na variável `OPENAI_API_KEY`.
    ```env
    OPENAI_API_KEY=SUA_CHAVE_DA_API_AQUI
    AI_PROVIDER=openai # ou 'mock' para usar o provedor de mock
    ```

3.  **Execute a aplicação com Docker Compose:**
    ```bash
    docker-compose up --build -d
    ```
    Este comando irá construir a imagem Docker da aplicação e iniciar o container em modo detached (em segundo plano).

4.  **Verifique se a aplicação está rodando:**
    - A API estará disponível em `http://localhost:3000`.
    - Você pode testar o endpoint de piadas com o seguinte comando:
    ```bash
    curl http://localhost:3000/joke
    ```

## A importância dos Guardrails para jovens estudantes

Grandes modelos de linguagem são ferramentas incrivelmente poderosas, mas também imprevisíveis. Quando utilizados em ambientes educacionais, especialmente com crianças e adolescentes, existe o risco de a IA gerar conteúdo inadequado, impreciso ou até mesmo malicioso.

"Guardrails" (ou "barreiras de proteção") são mecanismos de segurança projetados para mitigar esses riscos. Eles funcionam como filtros e validadores que se interpõem entre o aluno e a IA, garantindo que a interação seja sempre segura e construtiva. A ausência de guardrails é como dar a uma criança acesso irrestrito à internet sem qualquer tipo de supervisão ou filtro de conteúdo.

Para estudantes jovens, os guardrails são essenciais para:
-   **Proteger contra conteúdo impróprio:** Evitar que a IA gere respostas com linguagem ofensiva, violência, ou temas adultos.
-   **Garantir a precisão pedagógica:** Validar se a informação gerada pela IA está correta e alinhada com o currículo escolar.
-   **Prevenir a manipulação e o viés:** Modelos de IA podem ser manipulados para gerar desinformação. Os guardrails ajudam a detectar e bloquear tentativas de "jailbreak" (enganar a IA) e a reduzir o impacto de vieses presentes nos dados de treinamento.
-   **Promover um ambiente de aprendizado seguro:** Criar um espaço digital onde pais e educadores possam confiar que os alunos estão explorando o conhecimento de forma segura.

## Como o código protege os estudantes

O SafeTutor API implementa uma série of guardrails técnicos para garantir a segurança dos estudantes:

1.  **Validação de Saída com Zod:**
    - Toda e qualquer resposta gerada pela IA é forçada a se conformar com um esquema (schema) predefinido usando a biblioteca Zod.
    - No `SafeRAGService`, o método `getSafeResponse` recebe um `schema` Zod junto com o prompt.
    - Se a resposta da IA não estiver perfeitamente alinhada com o esquema (por exemplo, se faltar um campo obrigatório ou se um tipo de dado for inválido), a resposta é descartada e um erro é lançado. Isso impede que respostas malformadas ou "alucinações" da IA cheguem ao usuário final.
    ```typescript
    // trecho de src/modules/safer-rag/safer-rag.service.ts
    const validationResult = schema.safeParse(parsedContent);

    if (!validationResult.success) {
      console.error('Zod validation failed:', validationResult.error);
      throw new Error('LLM output failed validation.');
    }
    ```

2.  **Abstração do Provedor de IA:**
    - O código é projetado para não depender de um único provedor de IA. A classe `AiProvider` define um contrato que qualquer provedor (OpenAI, Google Gemini, Anthropic Claude, etc.) deve seguir.
    - Isso permite trocar o modelo de IA subjacente sem alterar a lógica de negócio principal. Mais importante, permite criar provedores de "mock" ou de "teste" que simulam respostas maliciosas, permitindo testar rigorosamente a eficácia dos nossos guardrails.
    - No arquivo `safer-rag.module.ts`, podemos facilmente alternar entre o provedor real da OpenAI e um provedor de mock para desenvolvimento e testes, usando uma variável de ambiente:
    ```typescript
    // trecho de src/modules/safer-rag/safer-rag.module.ts
    {
      provide: AiProvider,
      useClass:
        process.env.AI_PROVIDER === 'mock' ? MockProvider : OpenAIProvider,
    }
    ```

3.  **Testes de Regressão e "Red Teaming":**
    - A filosofia do projeto é "teste primeiro". Para cada guardrail, existem testes unitários que simulam respostas válidas, inválidas e maliciosas da IA.
    - O uso de mocks nos testes (`test/mocks/openai.mock.ts`) é fundamental para garantir que o sistema se comporte de maneira previsível, mesmo quando a IA se comporta de maneira imprevisível.

Essa abordagem em camadas garante que o SafeTutor API seja uma base robusta e confiável para a construção de ferramentas de IA educacionais seguras para o público jovem.
