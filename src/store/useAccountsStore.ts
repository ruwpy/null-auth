import { create } from "zustand";
import { IAccount } from "../types";

interface AccountsStoreProps {
  accounts: IAccount[];
  addAccount: (account: IAccount) => void;
  deleteAccount: (idToDelete: string) => void;
  getAccounts: (accounts: IAccount[]) => void;
  clearStore: () => void;
}

export const useAccountsStore = create<AccountsStoreProps>()((set) => ({
  accounts: [],
  addAccount: (account) => set((state) => ({ accounts: [...state.accounts, account] })),
  deleteAccount: (idToDelete) =>
    set((state) => ({ accounts: state.accounts.filter((acc) => acc.id !== idToDelete) })),
  getAccounts: (accounts) => set(() => ({ accounts })),
  clearStore: () => set(() => ({ accounts: [] })),
}));
