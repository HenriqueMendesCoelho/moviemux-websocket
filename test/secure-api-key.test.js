require('reflect-metadata');
require('ts-node/register');
const assert = require('node:assert/strict');
const { before, after, test } = require('node:test');
const express = require('express');
const { randomUUID } = require('node:crypto');
const { DataSource } = require('typeorm');
const { ApiKey } = require('../src/entity/ApiKey');
const { secureApiKey } = require('../src/middleware/SecureEndpointMiddleware');

const key = 'Kb.local-test-key';
// Never use application/production credentials for the regression database.
const testDatabaseUrl = process.env.TEST_DATABASE_URL;
if (!testDatabaseUrl || !['localhost', '127.0.0.1', '[::1]'].includes(new URL(testDatabaseUrl).hostname)) {
  throw new Error('Set TEST_DATABASE_URL to a local PostgreSQL test database.');
}
const schema = `api_key_test_${randomUUID().replaceAll('-', '')}`;
const database = new DataSource({
  type: 'postgres',
  url: testDatabaseUrl,
  schema,
  entities: [ApiKey],
  synchronize: false,
});
let server;
let url;
let handlerCalls = 0;

before(async () => {
  await database.initialize();
  await database.query(`CREATE SCHEMA "${schema}"`);
  await database.synchronize();
  await ApiKey.save({ key });
  const app = express();
  app.post('/protected', secureApiKey, (_request, response) => {
    handlerCalls++;
    response.sendStatus(204);
  });
  server = await new Promise(resolve => {
    const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
  });
  url = `http://127.0.0.1:${server.address().port}/protected`;
});

after(async () => {
  if (server) await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  if (database.isInitialized) {
    try {
      await database.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
    } finally {
      await database.destroy();
    }
  }
});

for (const authorization of [`Bearer ${key}`, `bearer ${key}`]) {
  test(`accepts a registered key with ${authorization.split(' ')[0]} scheme`, async () => {
    const beforeCalls = handlerCalls;
    const response = await fetch(url, { method: 'POST', headers: { authorization } });
    assert.equal(response.status, 204);
    assert.equal(handlerCalls, beforeCalls + 1);
  });
}

const rejectedHeaders = [
  ['missing header', undefined],
  ['empty header', ''],
  ['unknown key', 'Bearer Kb.unknown-test-key'],
  ['empty token', 'Bearer '],
  ['empty key suffix', 'Bearer Kb.'],
  ['incorrect key prefix', 'Bearer Other.test-key'],
  ['missing scheme', key],
  ['wrong scheme with registered key', `Basic  ${key}`],
  ['arbitrary seven-character prefix with registered key', `invalid${key}`],
  ['extra token', `Bearer ${key} extra`],
  ['multiple credentials', `Bearer ${key}, Bearer ${key}`],
];
for (const [description, authorization] of rejectedHeaders) {
  test(`rejects ${description} without invoking the protected handler`, async () => {
    const beforeCalls = handlerCalls;
    const response = await fetch(url, {
      method: 'POST',
      headers: authorization === undefined ? {} : { authorization },
    });
    assert.equal(response.status, 403);
    assert.equal(await response.text(), '');
    assert.equal(handlerCalls, beforeCalls);
  });
}
