import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ApiKey } from './src/entity/ApiKey';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/db/database.sqlite',
  entities: [ApiKey],
  synchronize: true,
  logging: false,
});
