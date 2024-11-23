/**
 * Represents a participant
 * @class ParticipantEntity
 */
export class ParticipantEntity {
  /**
   * Unique identifier for the participant: UUID (PK)
   * @type {string}
   */
  cod: string;

  /**
   * The first names of the participant.
   * @type {string}
   */
  nombres: string;

  /**
   * The last names of the participant.
   * @type {string}
   */
  apellidos: string;

  /**
   * The email address of the participant, which must be unique.
   * @type {string}
   */
  correoElectronico: string;

  /**
   * The date of birth of the participant.
   * @type {Date}
   */
  fechaNacimiento: Date;

  /**
   * Constructor for the ParticipantEntity class.
   * @param {string} cod The unique identifier (UUID) for the participant.
   * @param {string} nombres The first names of the participant.
   * @param {string} apellidos The last names of the participant.
   * @param {string} correoElectronico The email address of the participant.
   * @param {Date} fechaNacimiento The date of birth of the participant.
   */
  constructor(
    cod: string,
    nombres: string,
    apellidos: string,
    correoElectronico: string,
    fechaNacimiento: Date,
  ) {
    // Assign the provided parameters to the corresponding properties.
    this.cod = cod;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.correoElectronico = correoElectronico;
    this.fechaNacimiento = fechaNacimiento;
  }
}
