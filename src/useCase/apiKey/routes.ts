import Router from 'express';
import { apiKeyController } from '.';
import { secureApiKey } from '../../middleware/SecureEndpointMiddleware';

const router = Router();
const basePathV1 = '/api/v1';

router.get(`${basePathV1}`, secureApiKey, (request, response) => {
  return apiKeyController.listApiKey(request, response);
});

export { router as apiKeyRouter };
