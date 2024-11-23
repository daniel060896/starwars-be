import { Response } from "express";

import { DomainException } from "../../../domain/exceptions/DomainException";

/**
 * Base class for API controllers.
 *
 * This class provides common functionality for handling API requests and responses,
 * including error handling methods that can be used by derived controllers.
 */
export class ApiController {
  /**
   * Handles errors and sends appropriate responses.
   * @param {Response} res - The Express response object.
   * @param {any} error - The error object to handle.
   */
  protected errorHandler(res: Response, error: any) {
    // Check if the error is a DomainException
    if (error instanceof Error && "errorCode" in error && "statusCode" in error) {
      const e = error as DomainException; // Cast error to DomainException
      res.status(e.statusCode).send({ message: e.message, code: e.errorCode });
    } else {
      // Handle unexpected errors
      res.status(500).json({
        error: "Tenemos algunos inconvenientes. Por favor inténtelo en unos minutos.",
      });
    }
  }
}
