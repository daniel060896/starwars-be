import { AgeLimitExceededException } from "../../domain/exceptions/AgeLimitExceededException";
import { EmailAlreadyExistsException } from "../../domain/exceptions/EmailAlreadyExistsException";
import { ParticipantEntity } from "../../domain/models/ParticipantEntity";
import { IParticipantRepository } from "../../domain/repositories/ParticipantRepository";
import { IParticipantPort } from "../ports/ParticipantPort";

export class ParticipantService implements IParticipantPort {
  private readonly participantRepository: IParticipantRepository;
  constructor(participantRepository: IParticipantRepository) {
    this.participantRepository = participantRepository;
  }

  async listParticipants(page: number, pageSize: number): Promise<ParticipantEntity[]> {
    const participant = await this.participantRepository.listParticipants(page, pageSize);
    return participant.map(
      p =>
        new ParticipantEntity(
          p.cod,
          p.nombres,
          p.apellidos,
          p.correoElectronico,
          p.fechaNacimiento,
        ),
    );
  }
  async createParticipant(
    nombres: string,
    apellidos: string,
    correoElectronico: string,
    fechaNacimiento: Date,
  ): Promise<ParticipantEntity> {
    // obtain the participant age
    const now = new Date();
    let age = now.getFullYear() - fechaNacimiento.getFullYear();

    if (now.getMonth() < fechaNacimiento.getMonth()) age--;
    else if (
      now.getMonth() === fechaNacimiento.getMonth() &&
      now.getDate() < fechaNacimiento.getDate()
    )
      age--;

    // check if participant age is permitted
    if (age < 18 || age > 70) throw new AgeLimitExceededException();

    // check if participant exists in the DB
    const participantExists =
      await this.participantRepository.participantExistsByEmail(correoElectronico);
    if (participantExists) throw new EmailAlreadyExistsException(correoElectronico);

    const participant = await this.participantRepository.createParticipant(
      nombres,
      apellidos,
      correoElectronico,
      fechaNacimiento,
    );

    return new ParticipantEntity(
      participant.cod,
      participant.nombres,
      participant.apellidos,
      participant.correoElectronico,
      participant.fechaNacimiento,
    );
  }
}
