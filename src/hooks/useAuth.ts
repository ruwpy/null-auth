import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { db } from "../lib/db";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await db.auth.getSession();

      setSession(session);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

  return { session, loading };
};
