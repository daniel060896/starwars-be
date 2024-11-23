/**
 * Base class for all domain exceptions.
 * @class DomainException
 * @extends {Error}
 */
export class DomainException extends Error {
  /**
   * The error code associated with this exception.
   * @type {string}
   */
  public readonly errorCode: string;

  /**
   * The HTTP status code associated with this exception.
   * @type {number}
   */
  public readonly statusCode: number;

  /**
   * Constructor for the DomainException class.
   * @param {string} message The error message.
   * @param {string} errorCode The unique error code.
   * @param {number} statusCode The HTTP status code.
   */
  constructor(message: string, errorCode: string, statusCode: number) {
    // Call the parent constructor to set the error message.
    super(message);
    // Set the error code.
    this.errorCode = errorCode;
    // Set the HTTP status code.
    this.statusCode = statusCode;
  }
}
