import serverlessExpress from "aws-serverless-express";
import { Server } from "http";

import app from "./app";
import { AppDataSource } from "./infrastructure/database/data-source";

let server: Server;

const initializeApp = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      // initialize app data source
      await AppDataSource.initialize();
      console.log("Data Source Initialized (Lambda)");
      // then, migrations
      await AppDataSource.runMigrations();
      console.log("Migrations executed successfuly");
    } catch (e) {
      console.error("Error with the Database", e);
      throw new Error("Problems with the DB connection");
    }
  }
  if (!server) {
    server = serverlessExpress.createServer(app);
  }
};

export const handler = async (event: any, context: any) => {
  await initializeApp();
  return serverlessExpress.proxy(server, event, context);
};
