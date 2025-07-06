import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ApiKey } from './entity/ApiKey';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'src/db/database.sqlite',
  entities: [ApiKey],
  synchronize: true,
  logging: false,
});
