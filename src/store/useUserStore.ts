import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface UserStoreProps {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStoreProps>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
