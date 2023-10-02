import { Request, Response } from 'express';
import { ListApiKeyUseCase } from './listApiKey/ListApiKeyUseCase';

export class ApiKeyController {
  constructor(private listApiKeyUseCase: ListApiKeyUseCase) {}

  async listApiKey(request: Request, response: Response) {
    const result = this.listApiKeyUseCase.listApiKey();

    if (!result) {
      return response.status(204).send();
    }

    return response.status(200).json(result);
  }
}
