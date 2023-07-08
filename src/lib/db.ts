import { createClient } from "@supabase/supabase-js";
import { env } from "../../env.mjs";

const client = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_SECRET);

export const db = client;
