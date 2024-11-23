import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { SwapiService } from "../../../application/services/SwapiService";
import { ApiController } from "./ApiController";

export class SwapiController extends ApiController {
  private readonly swapiService: SwapiService;

  constructor(swapiService: SwapiService) {
    super();
    this.swapiService = swapiService;
  }

  async listPlanets(req: Request, res: Response): Promise<void> {
    try {
      // obtain validated query params
      const query = matchedData(req);
      const page: number = query["page"] ?? 1;

      // retrieve planets
      const planets = await this.swapiService.listPlanets(page);
      res.status(200).json({
        page,
        results: planets,
      });
    } catch (error) {
      this.errorHandler(res, error);
    }
  }
}
