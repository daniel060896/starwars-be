import { Router } from "express";
import { checkSchema } from "express-validator";

import { ParticipantController } from "../controllers/ParticipantController";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { paginationSchema } from "../schemas/paginationSchema";
import { participantRegisterSchema } from "../schemas/participantRegisterSchema";

export const participantRoutes = (
  participantController: ParticipantController,
): Router => {
  const router = Router();
  /**
   * @swagger
   * /api/participants:
   *   post:
   *     summary: Register a new participant
   *     tags: [Participants]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombres:
   *                 type: string
   *                 description: The first names of the participant (2-32 characters)
   *                 example: "John"
   *               apellidos:
   *                 type: string
   *                 description: The last names of the participant (2-32 characters)
   *                 example: "Doe"
   *               fechaNacimiento:
   *                 type: string
   *                 format: date
   *                 description: The date of birth of the participant (YYYY-MM-DD)
   *                 example: "1990-01-01"
   *               correoElectronico:
   *                 type: string
   *                 format: email
   *                 description: The email address of the participant
   *                 example: "john.doe@example.com"
   *     responses:
   *       201:
   *         description: Participant successfully registered
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 cod:
   *                   type: string
   *                   description: The unique identifier (UUID) of the participant
   *                   example: "123e4567-e89b-12d3-a456-426614174000"
   *                 nombres:
   *                   type: string
   *                   description: The first names of the participant
   *                   example: "John"
   *                 apellidos:
   *                   type: string
   *                   description: The last names of the participant
   *                   example: "Doe"
   *                 correoElectronico:
   *                   type: string
   *                   format: email
   *                   description: The email address of the participant
   *                   example: "john.doe@example.com"
   *                 fechaNacimiento:
   *                   type: string
   *                   format: date
   *                   description: The date of birth of the participant
   *                   example: "1990-01-01"
   *       400:
   *         description: Participant already registered or validation error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *                   example: "El participante con correo john.doe@example.com ya está registrado."
   *                 code:
   *                   type: string
   *                   description: Application-specific error code
   *                   example: "ERR-0001"
   *       422:
   *         description: Invalid request data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errors:
   *                   type: array
   *                   description: List of validation errors
   *                   items:
   *                     type: object
   *                     properties:
   *                       field:
   *                         type: string
   *                         description: The field with an error
   *                         example: "nombres"
   *                       message:
   *                         type: string
   *                         description: Explanation of the validation error
   *                         example: "Field nombres must be at least 2 characters."
   *       500:
   *         description: Unexpected server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Generic server error message
   *                   example: "Tenemos algunos inconvenientes. Por favor inténtelo en unos minutos."
   */
  router.post(
    "/participants",
    checkSchema(participantRegisterSchema),
    validationMiddleware,
    participantController.registerParticipant.bind(participantController),
  );

  /**
   * @swagger
   * /api/participants:
   *   get:
   *     summary: Retrieve a paginated list of participants
   *     tags: [Participants]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         description: The page number for pagination
   *       - in: query
   *         name: page-size
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 50
   *           default: 20
   *         description: The number of participants per page
   *     responses:
   *       200:
   *         description: Paginated list of participants successfully retrieved
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 page:
   *                   type: integer
   *                   description: Current page of the result set
   *                   example: 1
   *                 results:
   *                   type: array
   *                   description: Array of participants
   *                   items:
   *                     type: object
   *                     properties:
   *                       cod:
   *                         type: string
   *                         description: The unique identifier (UUID) of the participant
   *                         example: "123e4567-e89b-12d3-a456-426614174000"
   *                       nombres:
   *                         type: string
   *                         description: The first names of the participant
   *                         example: "John"
   *                       apellidos:
   *                         type: string
   *                         description: The last names of the participant
   *                         example: "Doe"
   *                       correoElectronico:
   *                         type: string
   *                         format: email
   *                         description: The email address of the participant
   *                         example: "john.doe@example.com"
   *                       fechaNacimiento:
   *                         type: string
   *                         format: date
   *                         description: The date of birth of the participant
   *                         example: "1990-01-01"
   *       422:
   *         description: Invalid query parameter(s)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errors:
   *                   type: array
   *                   description: List of validation errors
   *                   items:
   *                     type: object
   *                     properties:
   *                       field:
   *                         type: string
   *                         description: The field with an error
   *                         example: "page"
   *                       message:
   *                         type: string
   *                         description: Explanation of the validation error
   *                         example: "Page should be a valid number."
   *       500:
   *         description: Unexpected server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Generic server error message
   *                   example: "Tenemos algunos inconvenientes. Por favor inténtelo en unos minutos."
   */
  router.get(
    "/participants",
    checkSchema(paginationSchema),
    validationMiddleware,
    participantController.listParticipants.bind(participantController),
  );

  return router;
};
