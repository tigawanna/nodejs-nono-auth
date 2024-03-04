import { z } from "zod";

export const SECRETS = z.object({
  JWT_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
});
