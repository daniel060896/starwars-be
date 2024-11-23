import { faker } from "@faker-js/faker";
import { ParticipantOrmEntity } from "../../src/infrastructure/database/entities/participantOrmEntity";
import {
  destroyTestDataSource,
  initializeTestDataSource,
  resetDatabase,
} from "../utils/database.utils";
import { AppDataSource } from "../../src/infrastructure/database/data-source";
import { ParticipantTypeOrmRepository } from "../../src/infrastructure/database/repositories/ParticipantTypeOrmRepository";

beforeAll(async () => {
  await initializeTestDataSource();
});

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await destroyTestDataSource();
});

const generateFakeParticipant = (): ParticipantOrmEntity => {
  const user = new ParticipantOrmEntity();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email().toLowerCase();
  user.birthdate = new Date(2000, 1, 1);
  return user;
};

describe("List Participants", () => {
  it("List participants", async () => {
    /*
     * Given 14 participants in the database and a participant typeOrm Repository
     * When the listParticipants method is called
     *   with page = 2 and pageSize = 10
     * Then it should result a list of 4 participants
     */

    // 14 participants
    const currParticipants = Array.from({ length: 14 }, generateFakeParticipant);
    // in the DB
    const participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
    await participantRepo.save(currParticipants);

    // participant typeOrm repository
    const participantTypeOrmRepo = new ParticipantTypeOrmRepository();

    // listParticipants called
    const participants = await participantTypeOrmRepo.listParticipants(2, 10);

    //list of 4 participants
    expect(participants).toHaveLength(4);
  });
});

describe("Create Participant", () => {
  it("Create Participant ", async () => {
    /**
     * Given a participant typeOrm Repository and an empty DB
     * When the createParticipant is called
     * Then the participant should be registered
     */

    // participant typeOrm repository
    const participantTypeOrmRepo = new ParticipantTypeOrmRepository();

    const participant = generateFakeParticipant();

    //  createParticipant called
    const resp = await participantTypeOrmRepo.createParticipant(
      participant.firstName,
      participant.lastName,
      participant.email,
      participant.birthdate,
    );

    // participant should be registered
    const participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
    expect(await participantRepo.count()).toBe(1);
  });
});

describe("Verify if participant with email exists", () => {
  it("Participant already exists", async () => {
    /**
     * Given a participant in the DB and a participant typeOrm Repository
     * When a participantExistsByEmail is called with an existing email
     * Then it should return true
     */

    // 1 participant in the DB
    const participant = generateFakeParticipant();
    const participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
    await participantRepo.save(participant);

    // participant typeOrm repository
    const participantTypeOrmRepo = new ParticipantTypeOrmRepository();

    // participantExistsByEmail called
    const exists = await participantTypeOrmRepo.participantExistsByEmail(
      participant.email,
    );

    // it should return true
    expect(exists).toBe(true);
  });

  it("Participant doesn't exist", async () => {
    /**
     * Given a participant in the DB and a participant typeOrm Repository
     * When a participantExistsByEmail is called with an non-existing email
     * Then it should return false
     */

    // 1 participant in the DB
    const participant = generateFakeParticipant();
    const participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
    await participantRepo.save(participant);

    // participant typeOrm repository
    const participantTypeOrmRepo = new ParticipantTypeOrmRepository();

    // participantExistsByEmail called
    const exists = await participantTypeOrmRepo.participantExistsByEmail(
      "no.guarana.no.fun@gmail.com",
    );

    // it should return true
    expect(exists).toBe(false);
  });
});
