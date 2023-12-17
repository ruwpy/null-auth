import { SetStateAction } from "react";

interface IOtp {
  id: string;
  secret: string;
  issuer: string;
  name?: string;
}

interface IPassword {
  id: string;
  login: string;
  email: string;
  password: string;
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
  hashedPassphrase: string;
  otpAccounts: IOtp[];
  cards: ICard[];
  passwords: IPassword[];
  isLoading: boolean;
  setPassphrase: React.Dispatch<SetStateAction<string>>;
  setHashedPassphrase: React.Dispatch<SetStateAction<string>>;
  setOtpAccounts: React.Dispatch<SetStateAction<IOtp[]>>;
  setCards: React.Dispatch<SetStateAction<ICard[]>>;
  setPasswords: React.Dispatch<SetStateAction<IPassword[]>>;
}
