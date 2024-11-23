import { DomainException } from "./DomainException";

export class AgeLimitExceededException extends DomainException {
  constructor() {
    super(
      `El usuario debe tener al menos 18 años y no debe tener más de 70 años.`,
      "ERR-0002",
      400,
    );
  }
}
