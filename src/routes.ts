import Router from 'express';
import { movieRouter } from './useCase/movie/routes';
import { apiKeyRouter } from './useCase/apiKey/routes';

const router = Router();
router.use(movieRouter);
router.use(apiKeyRouter);

export { router };
