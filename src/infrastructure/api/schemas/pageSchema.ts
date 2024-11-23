import { DefaultSchemaKeys, Schema } from "express-validator/lib/middlewares/schema";

export const pageSchema: Schema<DefaultSchemaKeys> = {
  page: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1 },
    },
    toInt: true,
    default: {
      options: 1,
    },
  },
};
