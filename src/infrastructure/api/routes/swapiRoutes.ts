import { Router } from "express";
import { checkSchema } from "express-validator";

import { SwapiController } from "../controllers/SwapiController";
import { pageSchema } from "../schemas/pageSchema";

export const swapiRoutes = (swapiController: SwapiController): Router => {
  const router = Router();

  /**
   * @swagger
   * /api/planets:
   *   get:
   *     summary: Retrieve a list of planets
   *     tags: [Planets]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         description: The page number for paginated results
   *     responses:
   *       200:
   *         description: List of planets successfully retrieved
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
   *                   description: Array of planets
   *                   items:
   *                     type: object
   *                     properties:
   *                       nombre:
   *                         type: string
   *                         description: The name of the planet
   *                         example: Tatooine
   *                       periodoRotacion:
   *                         type: number
   *                         description: The rotation period of the planet in hours
   *                         example: 23
   *                       periodoOrbita:
   *                         type: number
   *                         description: The orbital period of the planet in days
   *                         example: 304
   *                       diametro:
   *                         type: number
   *                         description: The diameter of the planet in kilometers
   *                         example: 10465
   *                       clima:
   *                         type: string
   *                         description: The climate of the planet
   *                         example: Arid
   *                       gravedad:
   *                         type: string
   *                         description: The gravity of the planet
   *                         example: 1 standard
   *                       terreno:
   *                         type: string
   *                         description: The terrain of the planet
   *                         example: Desert
   *                       aguaSuperficial:
   *                         type: number
   *                         description: The percentage of surface water on the planet
   *                         example: 1
   *                       poblacion:
   *                         type: number
   *                         description: The population of the planet
   *                         example: 200000
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
    "/planets",
    checkSchema(pageSchema),
    swapiController.listPlanets.bind(swapiController),
  );

  return router;
};
