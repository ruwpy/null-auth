import { SetStateAction } from "react";

interface IAccount {
  id: string;
  secret: string;
  issuer: string;
  name?: string;
}

interface ICard {
  issuerBank: TCardType;
  id: string;
  cardNumber: string;
  cardHolder: string;
  date: Date;
  cvv: number;
}

type TCardType =
  | "amex"
  | "diners_club_carte_blanche"
  | "diners_club_international"
  | "jcb"
  | "laser"
  | "visa_electron"
  | "visa"
  | "mastercard"
  | "discover"
  | "dankort"
  | "maestro"
  | "uatp"
  | "mir";

interface ICardType {
  name: TCardType;
  validLength: number[];
  range: number[];
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
