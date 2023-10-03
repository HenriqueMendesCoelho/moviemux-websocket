import { NextFunction, Request, Response } from 'express';
import { ApiKey } from '../entity/ApiKey';

export async function secureApiKey(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const headerAuthorization = request.headers['authorization'];

  if (!headerAuthorization) {
    response.status(403).end();
    return;
  }

  const apikey = headerAuthorization.slice(7);
  const startsWithKb = apikey.slice(0, 3) === 'Kb.';

  if (!startsWithKb) {
    response.status(403).end();
    return;
  }

  const apikeyExists = await ApiKey.findBy({ key: apikey });

  if (!apikeyExists) {
    response.status(403).end();
    return;
  }

  next();
}
