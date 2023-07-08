import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    VITE_SUPABASE_URL: z.string().url(),
    VITE_SUPABASE_SECRET: z.string()
  },
  runtimeEnv: {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_SECRET: process.env.VITE_SUPABASE_SECRET
  }
})