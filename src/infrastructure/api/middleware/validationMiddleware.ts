import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware to validate request data.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function to call.
 */
export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Get validation errors from the request
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If there are validation errors, respond with a 422 status code
    res.status(422).json({ errors: errors.array() });
    return;
  }
  // next middleware
  next();
};
