import axios from "axios";

import { PlanetEntity } from "../../domain/models/PlanetEntity";
import { ISwapiRepository } from "../../domain/repositories/SwapiRepository";

// TODO: move interface
interface ISwapiPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;

  created: string;
  edited: string;
}

export class SwapiExternalRepository implements ISwapiRepository {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // Método para obtener planetas desde SWAPI
  async listPlanets(page: number): Promise<PlanetEntity[]> {
    try {
      // request data
      const response = await axios.get(`${this.apiUrl}/planets/`, {
        params: {
          page,
          format: "json",
        },
      });
      // map fields
      return response.data.results.map(
        (p: ISwapiPlanet) =>
          new PlanetEntity(
            p.name,
            parseFloat(p.rotation_period),
            parseFloat(p.orbital_period),
            parseFloat(p.diameter),
            p.climate,
            p.gravity,
            p.terrain,
            parseFloat(p.surface_water),
            parseFloat(p.population),
          ),
      );
    } catch (e) {
      // empty data
      if ("detail" in e.response) return [];
      // unexpected error
      else throw e;
    }
  }
}
