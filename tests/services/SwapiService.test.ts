import { faker } from "@faker-js/faker";
import { PlanetEntity } from "../../src/domain/models/PlanetEntity";
import { ISwapiRepository } from "../../src/domain/repositories/SwapiRepository";
import { SwapiService } from "../../src/application/services/SwapiService";

const generateFakePlanets = (): PlanetEntity => {
  return {
    nombre: faker.company.name(),
    periodoRotacion: faker.number.int({ min: 20, max: 100 }),
    periodoOrbita: faker.number.int({ min: 20, max: 1000 }),
    diametro: faker.number.int({ min: 2000, max: 10000 }),
    clima: faker.location.timeZone(),
    gravedad: `${faker.number.int()} standard`,
    terreno: faker.location.timeZone(),
    aguaSuperficial: faker.number.int({ min: 2, max: 10 }),
    poblacion: faker.number.int({ min: 2000, max: 1000000 }),
  };
};

describe("List Planets", () => {
  it("List planets", async () => {
    /**
     * Given a instance of SwapiService
     * When the listPlanet method is called
     * Then a list of planets should be returned
     */

    // swapiRepository mock
    class MockSwapiRepo implements ISwapiRepository {
      async listPlanets(page: number): Promise<PlanetEntity[]> {
        return Array.from({ length: 10 }, generateFakePlanets);
      }
    }
    const mockSwapiRepo = new MockSwapiRepo();
    // swapi service
    const swapiService = new SwapiService(mockSwapiRepo);

    // listPlanet is called
    const planets = await swapiService.listPlanets(1);

    // it should return a list of planets
    expect(planets).toHaveLength(10);
  });
});
