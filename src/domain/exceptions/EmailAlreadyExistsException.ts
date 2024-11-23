import { DomainException } from "./DomainException";

export class EmailAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super(`El participante con correo ${email} ya está registrado.`, "ERR-0001", 400);
  }
}
