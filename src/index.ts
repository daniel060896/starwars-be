import app from "./app";
import { PORT } from "./config";
import { AppDataSource } from "./infrastructure/database/data-source";

require("dotenv").configDotenv();

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/`);
    });
  })
  .catch(error => console.log("Database connection error:", error));
