
export abstract class AiProvider {
  abstract generateJson(prompt: string): Promise<string>;
}
