// load env vars
// please, DON'T use it in PRODUCTION environment
require("dotenv").configDotenv();

import { DataSource, DataSourceOptions } from "typeorm";

import {
  DATABASE,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_PORT,
  DATABASE_USER,
} from "../../config";
import { ENTITIES } from "./data-source";

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
export const AppDataSource = new DataSource(MYSQL_DATA_CONN);
