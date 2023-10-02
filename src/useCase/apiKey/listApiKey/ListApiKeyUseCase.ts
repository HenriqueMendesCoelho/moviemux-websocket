import { ApiKey } from '../../../entity/ApiKey';

export class ListApiKeyUseCase {
  async listApiKey() {
    try {
      const apiKey = await ApiKey.find();

      if (!apiKey?.length) {
        return null;
      }

      return apiKey;
    } catch (error) {
      return undefined;
    }
  }
}
