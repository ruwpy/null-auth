import { SetStateAction } from "react";

interface IAccount {
  id: string;
  secret: string;
  issuer: string;
  name?: string;
}

interface ICard {
  id: string;
  cardNumber: number;
  cardHolder: string;
  date: Date;
  cvv: number;
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
