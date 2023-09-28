import 'reflect-metadata';
import crypto from 'crypto';
import { ApiKey } from './entity/ApiKey';

export async function validateStart() {
  const apiKeys = await ApiKey.find();

  if (apiKeys?.length) {
    return;
  }

  const result = await ApiKey.save({ key: generateKey() });

  console.log(
    '\n',
    '**** First start ****',
    '\n',
    'New apikey been created',
    '\n',
    `apikey: ${result.key}`,
    '\n',
    '*********************'
  );
}

function generateKey(size = 100) {
  return `Kb.${crypto.randomBytes(size).toString('base64').slice(0, size)}`;
}
