import { Schema } from "express-validator";
import { DefaultSchemaKeys } from "express-validator/lib/middlewares/schema";

import { pageSchema } from "./pageSchema";

export const paginationSchema: Schema<DefaultSchemaKeys> = {
  ...pageSchema,
  "page-size": {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1, max: 50 },
    },
    toInt: true,
    default: {
      options: 20,
    },
  },
};
