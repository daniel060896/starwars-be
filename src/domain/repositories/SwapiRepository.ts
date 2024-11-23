import { PlanetEntity } from "../models/PlanetEntity";

/**
 * Planet Repository.
 */
export interface ISwapiRepository {
  /**
   * Retrieves a list of planets.
   * @param {number} page - The page number to fetch.
   * @returns {Promise<PlanetEntity[]>} An array of PlanetEntity entities.
   */
  listPlanets: (page: number) => Promise<PlanetEntity[]>;
}
