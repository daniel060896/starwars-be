/* Environment variables */

type DatabaseType = "sqlite" | "mysql";

export const DATABASE: DatabaseType = (process.env.DATABASE as DatabaseType) ?? "sqlite";

export const DATABASE_HOST: string = process.env.DATABASE_HOST ?? "localhost";
export const DATABASE_PORT: number = parseInt(process.env.DATABASE_PORT ?? "3306");
export const DATABASE_USER: string = process.env.DATABASE_USER ?? "test";
export const DATABASE_PASS: string = process.env.DATABASE_PASS ?? "test";
export const DATABASE_NAME: string = process.env.DATABASE_NAME ?? "test";

export const PORT: string = process.env.PORT || "3000";

export const SWAPI_URL: string = "https://swapi.py4e.com/api";
