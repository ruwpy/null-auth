import { SetStateAction } from "react";

interface IOtp {
  id: string;
  secret: string;
  issuer: string;
  name?: string;
  code?: string;
}

interface IPassword {
  id: string;
  issuerService: string;
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
  | "diners_club_international"
  | "jcb"
  | "visa_electron"
  | "visa"
  | "mastercard"
  | "discover"
  | "dankort"
  | "maestro"
  | "mir";

interface ICardType {
  name: TCardType;
  validLength: number[];
  range: number[];
}

interface IAppStoreData {
  passphrase: string;
  hashedPassphrase: string;
  otpAccounts: IOtp[] | undefined;
  cards: ICard[] | undefined;
  passwords: IPassword[] | undefined;
  isLoading: boolean;
  setPassphrase: React.Dispatch<SetStateAction<string>>;
  setHashedPassphrase: React.Dispatch<SetStateAction<string>>;
  setOtpAccounts: React.Dispatch<SetStateAction<IOtp[] | undefined>>;
  setCards: React.Dispatch<SetStateAction<ICard[] | undefined>>;
  setPasswords: React.Dispatch<SetStateAction<IPassword[] | undefined>>;
}
