import { SetStateAction } from "react";

interface IAccount {
  secret: string;
  issuer: string;
  name?: string;
}

interface IAppStoreData {
  passphrase: string;
  accounts: IAccount[];
  isAuthenticated: boolean;
  setPassphrase: (passphrase: string) => void;
  setAccounts: React.Dispatch<SetStateAction<IAccount[]>>;
  setAuthenticated: (val: boolean) => void;
  // getPassphrase: () => Promise<void>;
  // getAccounts: () => Promise<void>;
  // verifyPassphrase: (passphrase: string) => Promise<void>;
  // addAccount: (account: IAccount, passphrase: string) => Promise<void>;
  // deleteAccount: (accountSecret: string) => Promise<void>;
}
