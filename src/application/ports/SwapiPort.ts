import { PlanetEntity } from "../../domain/models/PlanetEntity";

export interface ISwapiPort {
  /**
   * Retrieves a list of planets
   * @param {number} page - The page number to fetch.
   * @returns {Promise<PlanetEntity[]>} An array of PlanetEntity objects.
   */
  listPlanets(page: number): Promise<PlanetEntity[]>;
}
