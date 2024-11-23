import { faker } from "@faker-js/faker";
import { ParticipantOrmEntity } from "../../src/infrastructure/database/entities/participantOrmEntity";
import {
  destroyTestDataSource,
  initializeTestDataSource,
  resetDatabase,
} from "../utils/database.utils";
import request from "supertest";
import { router } from "../../src/app";
import { AppDataSource } from "../../src/infrastructure/database/data-source";

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
     * Given 14 participants in the database
     * When a list of participants is requested
     *   with page = 2 and page-size = 10
     * Then it should result a list of 4 participants
     */
    // 14 participants
    const participants = Array.from({ length: 14 }, generateFakeParticipant);
    const participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
    // in the DB
    await participantRepo.save(participants);

    // request
    const resp = await request(router)
      .get("/api/participants")
      .query({ page: 2, "page-size": 10 });

    expect(resp.statusCode).toBe(200);
    //list of 4 participants
    expect(resp.body.results).toHaveLength(4);
  });
});

describe("Register Participant", () => {
  it("Avoid creating another participant with the same email", async () => {
    /**
     * Given 1 participant in the database
     * When the participant send registration form with an existing email
     * Then the participant shouldn't be registered again and
     *    the response status code should be 400
     */

    // 1 participant in the DB
    const participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
    const participant = generateFakeParticipant();
    await participantRepo.save(participant);

    // send registration form
    const resp = await request(router)
      .post("/api/participants")
      .send({
        nombres: participant.firstName,
        apellidos: participant.lastName,
        correoElectronico: participant.email,
        fechaNacimiento: participant.birthdate.toISOString().slice(0, 10),
      });

    // status code 400
    expect(resp.statusCode).toBe(400);
    expect(resp.body.code).toBe("ERR-0001");
    // participant shouldn't be registered again
    expect(await participantRepo.count()).toBe(1);
  });
  it("Avoid creating participant with invalid age", async () => {
    /**
     * Given an empty database
     * When the participant send registration form with invalid age
     * Then the participant shouldn't be registered again and
     *    the response status code should be 400
     */

    const participant = generateFakeParticipant();

    // send registration form
    const resp = await request(router)
      .post("/api/participants")
      .send({
        nombres: participant.firstName,
        apellidos: participant.lastName,
        correoElectronico: participant.email,
        fechaNacimiento: new Date().toISOString().slice(0, 10),
      });

    // status code 400
    expect(resp.statusCode).toBe(400);
    expect(resp.body.code).toBe("ERR-0002");
    // participant shouldn't be registered again
    const participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
    expect(await participantRepo.count()).toBe(0);
  });
  it("Create new Participant", async () => {
    /**
     * Given a participant in the DB
     * When the participant send registration form
     * Then the participant should be registered and
     *    the response status code should be 201
     */

    const oldParticipant = generateFakeParticipant();
    const participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
    await participantRepo.save(oldParticipant);

    const participant = generateFakeParticipant();

    // send registration form
    const resp = await request(router)
      .post("/api/participants")
      .send({
        nombres: participant.firstName,
        apellidos: participant.lastName,
        correoElectronico: participant.email,
        fechaNacimiento: participant.birthdate.toISOString().slice(0, 10),
      });

    // status code 201
    expect(resp.statusCode).toBe(201);
    // participant should be registered
    expect(await participantRepo.count()).toBe(2);
  });
  it("Create new Participant in an empty DB", async () => {
    /**
     * Given an empty DB
     * When the participant send registration form
     * Then the participant should be registered and
     *    the response status code should be 201
     */

    const participant = generateFakeParticipant();

    // send registration form
    const resp = await request(router)
      .post("/api/participants")
      .send({
        nombres: participant.firstName,
        apellidos: participant.lastName,
        correoElectronico: participant.email,
        fechaNacimiento: participant.birthdate.toISOString().slice(0, 10),
      });

    // status code 201
    expect(resp.statusCode).toBe(201);
    // participant should be registered
    const participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
    expect(await participantRepo.count()).toBe(1);
  });
});
