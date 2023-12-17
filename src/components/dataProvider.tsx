import { SetStateAction, createContext, useEffect, useState } from "react";
import { IOtp, IAppStoreData, ICard, IPassword } from "@/types";
import { TDataKeys, store } from "@/store";

type TRequiredData = {
  [key in TDataKeys]: React.Dispatch<SetStateAction<any>>;
};

export const AppContext = createContext<IAppStoreData | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [passphrase, setPassphrase] = useState<string>("");
  const [hashedPassphrase, setHashedPassphrase] = useState<string>("");
  const [otpAccounts, setOtpAccounts] = useState<IOtp[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const [passwords, setPasswords] = useState<IPassword[]>([]);
  const [isLoading, setLoading] = useState(true);

  const requiredData: TRequiredData = {
    otps: setOtpAccounts,
    cards: setCards,
    passwords: setPasswords,
  };

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      try {
        const hashedPassphrase = await store.getPassphrase();
        setHashedPassphrase(hashedPassphrase);

        if (passphrase) {
          let key: TDataKeys;

          for (key in requiredData) {
            const data = await store.getData(key, passphrase);
            requiredData[key](data);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [passphrase]);

  return (
    <AppContext.Provider
      value={{
        passphrase,
        hashedPassphrase,
        otpAccounts,
        cards,
        passwords,
        isLoading,
        setPassphrase,
        setHashedPassphrase,
        setCards,
        setPasswords,
        setOtpAccounts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
