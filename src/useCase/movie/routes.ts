import Router from 'express';
import { movieController } from '.';
import { secureApiKey } from '../../middleware/SecureEndpointMiddleware';

const router = Router();
const basePathV1 = '/api/v1';

router.post(
  `${basePathV1}/movie/all/emit/:event`,
  secureApiKey,
  (request, response) => {
    return movieController.allMovies(request, response);
  }
);

router.post(
  `${basePathV1}/movie/:movieId/note/emit/:event`,
  secureApiKey,
  (request, response) => {
    return movieController.movieNote(request, response);
  }
);

export { router as movieRouter };
