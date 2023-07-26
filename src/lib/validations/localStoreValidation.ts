import { z } from "zod";

export const passphraseValidation = z.string().nullable();

export const accountValidation = z
  .array(
    z.object({
      secret: z.string(),
      name: z.string(),
      issuer: z.string(),
    })
  )
  .nullable();
