import { ApiKeyController } from './ApiKeyController';
import { ListApiKeyUseCase } from './listApiKey/ListApiKeyUseCase';

const listApiKeyUseCase = new ListApiKeyUseCase();
const apiKeyController = new ApiKeyController(listApiKeyUseCase);
export { listApiKeyUseCase, apiKeyController };
