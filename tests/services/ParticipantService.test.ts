import { faker } from "@faker-js/faker";
import { ParticipantEntity } from "../../src/domain/models/ParticipantEntity";
import { IParticipantRepository } from "../../src/domain/repositories/ParticipantRepository";
import { ParticipantService } from "../../src/application/services/ParticipantService";

const generateFakeParticipants = (): ParticipantEntity => {
  return new ParticipantEntity(
    faker.string.uuid(),
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email().toLowerCase(),
    faker.date.between({
      from: "1990-01-01T00:00:00.000Z",
      to: "2000-01-01T00:00:00.000Z",
    }),
  );
};

class MockParticipantRepository implements IParticipantRepository {
  async listParticipants(page: number, pageSize: number): Promise<ParticipantEntity[]> {
    const participants = [];
    if (page > 2 || pageSize <= 0) return participants;
    return Array.from({ length: pageSize }, generateFakeParticipants);
  }
  async participantExistsByEmail(correoElectronico: string): Promise<boolean> {
    return correoElectronico === "daniel@gmail.com";
  }
  async createParticipant(
    nombres: string,
    apellidos: string,
    correoElectronico: string,
    fechaNacimiento: Date,
  ): Promise<ParticipantEntity> {
    return new ParticipantEntity(
      faker.string.uuid(),
      nombres,
      apellidos,
      correoElectronico,
      fechaNacimiento,
    );
  }
}
describe("List Participants", () => {
  const listParticipantsCases = [
    {
      page: 1,
      pageSize: 10,
      resultLength: 10,
    },
    {
      page: 4,
      pageSize: 10,
      resultLength: 0,
    },
    {
      page: 1,
      pageSize: 0,
      resultLength: 0,
    },
  ];
  listParticipantsCases.forEach(({ page, pageSize, resultLength }) => {
    it(`List participants: page: ${page}, pageSize: ${pageSize}`, async () => {
      /**
       * Given a instance of participantService
       * When the listParticipants method is called
       * Then a list of participants should be returned
       */

      // ParticipantRepository mock
      const mockSwapiRepo = new MockParticipantRepository();
      // Participant service
      const participantService = new ParticipantService(mockSwapiRepo);

      // listParticipants is called
      const planets = await participantService.listParticipants(page, pageSize);

      // it should return a list of planets
      expect(planets).toHaveLength(resultLength);
    });
  });

  const createParticipantCases = [
    {
      correoElectronico: "daniel@gmail.com",
      fechaNacimiento: new Date(1996, 7, 6),
      errorCode: "ERR-0001",
    },
    {
      correoElectronico: "rodrigo@gmail.com",
      fechaNacimiento: new Date(2008, 2, 7),
      errorCode: "ERR-0002",
    },
    {
      correoElectronico: "whitehatdevelopers@gmail.com",
      fechaNacimiento: new Date(2000, 2, 7),
      errorCode: null,
    },
  ];
  createParticipantCases.forEach(({ correoElectronico, fechaNacimiento, errorCode }) => {
    it(`Create participant: email: ${correoElectronico}, dob: ${fechaNacimiento}`, async () => {
      /**
       * Given a instance of participantService
       * When the createParticipant method is called
       * Then a result with either an error code or a participant should be returned
       */

      // ParticipantRepository mock
      const mockSwapiRepo = new MockParticipantRepository();
      // Participant service
      const participantService = new ParticipantService(mockSwapiRepo);

      // createParticipant is called
      if (errorCode) {
        // an error code should be returned
        await expect(
          participantService.createParticipant(
            faker.person.firstName(),
            faker.person.lastName(),
            correoElectronico,
            fechaNacimiento,
          ),
        ).rejects.toMatchObject({
          errorCode,
        });
      } else {
        // a participant should be returned
        const participant = await participantService.createParticipant(
          faker.person.firstName(),
          faker.person.lastName(),
          correoElectronico,
          fechaNacimiento,
        );
        expect(participant).toBeDefined();
        expect(participant.correoElectronico).toBe(correoElectronico);
      }
    });
  });
});
