import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_SUPABASE_URL: z.string().url(),
    VITE_SUPABASE_SECRET: z.string()
  },
  runtimeEnv: {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_SECRET: import.meta.env.VITE_SUPABASE_SECRET
  }
})