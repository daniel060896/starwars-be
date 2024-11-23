import { Repository } from "typeorm";

import { ParticipantEntity } from "../../../domain/models/ParticipantEntity";
import { IParticipantRepository } from "../../../domain/repositories/ParticipantRepository";
import { AppDataSource } from "../data-source";
import { ParticipantOrmEntity } from "../entities/participantOrmEntity";

export class ParticipantTypeOrmRepository implements IParticipantRepository {
  private participantRepo: Repository<ParticipantOrmEntity>;

  constructor() {
    this.participantRepo = AppDataSource.getRepository(ParticipantOrmEntity);
  }
  async createParticipant(
    nombres: string,
    apellidos: string,
    correoElectronico: string,
    fechaNacimiento: Date,
  ): Promise<ParticipantEntity> {
    // create orm object
    let participant = new ParticipantOrmEntity();
    participant.firstName = nombres;
    participant.lastName = apellidos;
    participant.email = correoElectronico.toLowerCase();
    participant.birthdate = fechaNacimiento;

    // save in the DB
    participant = await this.participantRepo.save(participant);

    return new ParticipantEntity(
      participant.id,
      participant.firstName,
      participant.lastName,
      participant.email,
      participant.birthdate,
    );
  }
  async participantExistsByEmail(correoElectronico: string): Promise<boolean> {
    const participantExists = await this.participantRepo.exists({
      where: { email: correoElectronico.toLowerCase() },
    });
    return participantExists;
  }
  async listParticipants(page: number, pageSize: number): Promise<ParticipantEntity[]> {
    // retrieve participants
    const [participants] = await this.participantRepo.findAndCount({
      skip: pageSize * (page - 1),
      take: pageSize,
      order: {
        email: "ASC",
      },
    });

    return participants.map(
      participant =>
        new ParticipantEntity(
          participant.id,
          participant.firstName,
          participant.lastName,
          participant.email,
          participant.birthdate,
        ),
    );
  }
}
