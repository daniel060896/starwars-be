import { DefaultSchemaKeys, Schema } from "express-validator/lib/middlewares/schema";

export const participantRegisterSchema: Schema<DefaultSchemaKeys> = {
  nombres: {
    isLength: {
      options: {
        min: 2,
        max: 32,
      },
    },
    notEmpty: true,
    escape: true,
    trim: true,
  },
  apellidos: {
    isLength: {
      options: {
        min: 2,
        max: 32,
      },
    },
    notEmpty: true,
    escape: true,
    trim: true,
  },
  fechaNacimiento: {
    isDate: {
      options: { format: "YYYY-MM-DD", strictMode: true },
    },
    notEmpty: true,
  },
  correoElectronico: {
    isLength: {
      options: {
        min: 5,
        max: 100,
      },
    },
    isEmail: true,
  },
};
