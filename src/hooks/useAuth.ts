import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { db } from "../lib/db";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);

  const getSession = async () => {
    const {
      data: { session },
    } = await db.auth.getSession();

    setSession(session);
  };

  useEffect(() => {
    getSession();

    const {
      data: { subscription },
    } = db.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session;
};
