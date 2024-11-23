import { PlanetEntity } from "../../domain/models/PlanetEntity";
import { ISwapiRepository } from "../../domain/repositories/SwapiRepository";
import { ISwapiPort } from "../ports/SwapiPort";

export class SwapiService implements ISwapiPort {
  private readonly swapiRepository: ISwapiRepository;

  constructor(swapiRepository: ISwapiRepository) {
    this.swapiRepository = swapiRepository;
  }

  async listPlanets(page: number): Promise<PlanetEntity[]> {
    const planetas = await this.swapiRepository.listPlanets(page);

    return planetas.map(
      planet =>
        new PlanetEntity(
          planet.nombre,
          planet.periodoRotacion,
          planet.periodoOrbita,
          planet.diametro,
          planet.clima,
          planet.gravedad,
          planet.terreno,
          planet.aguaSuperficial,
          planet.poblacion,
        ),
    );
  }
}
