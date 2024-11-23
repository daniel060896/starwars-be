import BodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { IncomingMessage, RequestListener, ServerResponse } from "http";
import swaggerUi from "swagger-ui-express";

import { ParticipantService } from "./application/services/ParticipantService";
import { SwapiService } from "./application/services/SwapiService";
import { SWAPI_URL } from "./config";
import { ParticipantController } from "./infrastructure/api/controllers/ParticipantController";
import { SwapiController } from "./infrastructure/api/controllers/SwapiController";
import { participantRoutes } from "./infrastructure/api/routes/participantRoutes";
import { swapiRoutes } from "./infrastructure/api/routes/swapiRoutes";
import { swaggerDocs } from "./infrastructure/api/swaggerDocs";
import { ParticipantTypeOrmRepository } from "./infrastructure/database/repositories/ParticipantTypeOrmRepository";
import { SwapiExternalRepository } from "./infrastructure/external/SwapiExternalRepository";

// creates an express application
const app = express();

// adding middlewares
app.use(express.json());
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(helmet());

// initialize participant related components

const participantRepository = new ParticipantTypeOrmRepository();
const participantService = new ParticipantService(participantRepository);
const participantController = new ParticipantController(participantService);

app.use("/api", participantRoutes(participantController));

// initialize SWAPI related components

const swapiRepository = new SwapiExternalRepository(SWAPI_URL);
const swapiService = new SwapiService(swapiRepository);
const swapiController = new SwapiController(swapiService);

app.use("/api", swapiRoutes(swapiController));

// api docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// basic
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

export default app;

// @ts-ignore just for testing
export const router: RequestListener<typeof IncomingMessage, typeof ServerResponse> = app;
