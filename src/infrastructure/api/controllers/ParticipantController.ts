import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { ParticipantService } from "../../../application/services/ParticipantService";
import { ApiController } from "./ApiController";

export class ParticipantController extends ApiController {
  private readonly participantService: ParticipantService;

  constructor(participantService: ParticipantService) {
    super();
    this.participantService = participantService;
  }

  async registerParticipant(req: Request, res: Response): Promise<void> {
    try {
      // obtain validated body params
      const { nombres, apellidos, correoElectronico, fechaNacimiento } = matchedData(req);
      // create participant
      const participant = await this.participantService.createParticipant(
        nombres,
        apellidos,
        correoElectronico,
        new Date(fechaNacimiento),
      );
      res.status(201).json(participant);
    } catch (error) {
      this.errorHandler(res, error);
    }
  }

  async listParticipants(req: Request, res: Response): Promise<void> {
    try {
      // obtain validated query params
      const query = matchedData(req);
      const page: number = query["page"] ?? 1;
      const pageSize: number = query["page-size"] ?? 20;

      // retrieve participants
      const participants = await this.participantService.listParticipants(page, pageSize);
      res.status(200).json({
        page,
        results: participants,
      });
    } catch (error) {
      this.errorHandler(res, error);
    }
  }
}
