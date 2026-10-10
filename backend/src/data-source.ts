import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: process.env.SQLITE_PATH ?? 'database.sqlite',
  entities: [join(process.cwd(), 'dist/**/*.entity.js')],
  migrations: [join(process.cwd(), 'dist/migrations/*.js')],
  synchronize: false,
});
