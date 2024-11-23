import { ParticipantEntity } from "../models/ParticipantEntity";

/**
 * Participant repository.
 * @interface IParticipantRepository
 */
export interface IParticipantRepository {
  /**
   * Creates a new participant.
   * @param {string} nombres First names.
   * @param {string} apellidos Last names.
   * @param {string} correoElectronico Email address.
   * @param {Date} fechaNacimiento Date of birth.
   * @returns {Promise<ParticipantEntity>} Created participant entity.
   */
  createParticipant: (
    nombres: string,
    apellidos: string,
    correoElectronico: string,
    fechaNacimiento: Date,
  ) => Promise<ParticipantEntity>;

  /**
   * Lists participants with pagination.
   * @param {number} page Page number.
   * @param {number} pageSize Page size.
   * @returns {Promise<ParticipantEntity[]>} Array of participant entities.
   */
  listParticipants: (page: number, pageSize: number) => Promise<ParticipantEntity[]>;

  /**
   * Checks if a participant exists by email.
   * @param {string} correoElectronico Email address.
   * @returns {Promise<boolean>} True if the participant exists, false otherwise.
   */
  participantExistsByEmail: (correoElectronico: string) => Promise<boolean>;
}
