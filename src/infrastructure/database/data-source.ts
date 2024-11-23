import "reflect-metadata";

import { DataSource, DataSourceOptions } from "typeorm";

import {
  DATABASE,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_PORT,
  DATABASE_USER,
} from "../../config";
import { ParticipantOrmEntity } from "./entities/participantOrmEntity";

/**
 * Entities are the models related to tables in the database
 */
export const ENTITIES = [ParticipantOrmEntity];

/**
 * SQLite3 credentials
 */
const SQLITE_DATA_CONN: DataSourceOptions = {
  type: "sqlite",
  database: "db.sqlite3",
  synchronize: true,
  logging: false,
  entities: ENTITIES,
};

/**
 * MySQL credentials
 */
export const MYSQL_DATA_CONN: DataSourceOptions = {
  type: DATABASE,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASS,
  database: DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: ENTITIES,
  migrations: ["src/infrastructure/database/migrations/*-migrations.ts"],
};
export const AppDataSource = new DataSource(
  DATABASE === "sqlite" ? SQLITE_DATA_CONN : MYSQL_DATA_CONN,
);
