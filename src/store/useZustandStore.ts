import { IAccount } from "@/types";
import { create } from "zustand";
import { store } from "./localStore";
import { encryptString } from "@/lib/rustFunctions";

interface ZustandStoreProps {
  passphrase: string;
  accounts: IAccount[] | [];
  getAccounts: () => Promise<void>;
  getPassphrase: () => Promise<void>;
  setPassphrase: (passphrase: string) => Promise<void>;
  addAccount: (account: IAccount, passphrase: string) => Promise<void>;
  deleteAccount: (accountSecret: string) => Promise<void>;
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
  addAccount: async (account, passphrase) => {
    const accounts = (await store.get("accounts")) as IAccount[];
    console.log(accounts);

    const B32_REGEX = /^[A-Z2-7]+=*$/;
    if (B32_REGEX.test(account.secret.toUpperCase())) {
      const encryptedSecret = await encryptString(account.secret, passphrase);

      if (accounts && accounts.some((acc) => acc.secret === encryptedSecret)) return;

      set((state) => ({
        accounts: [...state.accounts, { ...account, secret: encryptedSecret }],
      }));

      if (accounts)
        return await store.set("accounts", [
          ...accounts,
          { ...account, secret: encryptedSecret },
        ]);
      await store.set("accounts", [{ ...account, secret: encryptedSecret }]);
    }
  },
  deleteAccount: async (accountSecret) => {
    set((state) => ({
      accounts: state.accounts.filter((acc) => acc.secret !== accountSecret),
    }));

    const accounts = (await store.get("accounts")) as IAccount[];
    if (accounts.some((acc) => acc.secret === accountSecret))
      return await store.set(
        "accounts",
        accounts.filter((acc) => acc.secret !== accountSecret)
      );
  },
}));
