import { IAccount } from "@/types";
import { create } from "zustand";
import { store } from "./localStore";

interface ZustandStoreProps {
  passphrase: string;
  accounts: IAccount[] | [];
  getAccounts: () => Promise<void>;
  getPassphrase: () => Promise<void>;
  setPassphrase: (passphrase: string) => Promise<void>;
  addAccount: (account: IAccount) => Promise<void>;
  deleteAccount: (account: IAccount) => Promise<void>;
}

export const useZustandStore = create<ZustandStoreProps>()((set) => ({
  passphrase: "",
  accounts: [],
  getPassphrase: async () => {
    const passphrase = (await store.get("passphrase")) as string | null;
    set(() => ({ passphrase: passphrase ?? "" }));
  },
  getAccounts: async () => {
    const accounts = (await store.get("accounts")) as IAccount[] | null;
    set(() => ({ accounts: accounts ?? [] }));
  },
  setPassphrase: async (passphrase) => {
    set(() => ({ passphrase: passphrase }));

    await store.set("passphrase", passphrase);
    await store.save();
  },
  addAccount: async (account) => {
    set((state) => ({ accounts: [...state.accounts, account] }));

    const accounts = (await store.get("accounts")) as IAccount[];
    console.log(accounts);

    if (accounts) return await store.set("accounts", [...accounts, account]);
    await store.set("accounts", [account]);
  },
  deleteAccount: async (accountToDelete) => {
    set((state) => ({
      accounts: state.accounts.filter((acc) => acc.secret !== accountToDelete.secret),
    }));

    const accounts = (await store.get("accounts")) as IAccount[];
    if (accounts.some((acc) => acc.secret === accountToDelete.secret))
      return await store.set(
        "accounts",
        accounts.filter((acc) => acc.secret !== accountToDelete.secret)
      );
  },
}));
