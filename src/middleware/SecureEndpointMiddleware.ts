import { NextFunction, Request, Response } from 'express';
import { ApiKey } from '../entity/ApiKey';

export async function secureApiKey(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const headerAuthorization = request.headers['authorization'];

  const bearerToken = typeof headerAuthorization === 'string'
    ? /^Bearer (\S+)$/i.exec(headerAuthorization)
    : null;

  if (!bearerToken) {
    response.status(403).end();
    return;
  }

  const apikey = bearerToken[1];
  const startsWithKb = apikey.startsWith('Kb.') && apikey.length > 3;

  if (!startsWithKb) {
    response.status(403).end();
    return;
  }

  const apikeyExists = await ApiKey.findOneBy({ key: apikey });

  if (!apikeyExists) {
    response.status(403).end();
    return;
  }

  next();
}
