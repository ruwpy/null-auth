import { SetStateAction, createContext, useEffect, useState } from "react";
import { IOtp, IAppStoreData, ICard, IPassword } from "@/types";
import { IData, TDataKeys, store } from "@/store";
import { generateTotp } from "@/lib/commands";

type TRequiredData = {
  [key in TDataKeys]: React.Dispatch<SetStateAction<any>>;
};

export const AppContext = createContext<IAppStoreData | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [passphrase, setPassphrase] = useState<string>("");
  const [hashedPassphrase, setHashedPassphrase] = useState<string>("");
  const [otpAccounts, setOtpAccounts] = useState<IOtp[] | undefined>([]);
  const [cards, setCards] = useState<ICard[] | undefined>([]);
  const [passwords, setPasswords] = useState<IPassword[] | undefined>([]);
  const [isLoading, setLoading] = useState(true);

  const requiredData: TRequiredData = {
    otps: setOtpAccounts,
    cards: setCards,
    passwords: setPasswords,
  };

  const updateOtpCodes = async () => {
    if (otpAccounts?.length) {
      const newOtps = await Promise.all(
        otpAccounts.map(async (acc) => {
          const code: string = await generateTotp(acc.secret);

          return {
            ...acc,
            code,
          };
        })
      );

      setOtpAccounts(newOtps);

      let timeout: NodeJS.Timeout | null = null;

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => updateOtpCodes(), 30000);
    }
  };

  useEffect(() => {
    updateOtpCodes();

    const timeout = setTimeout(
      () => updateOtpCodes(),
      Number(`${30 - (new Date().getSeconds() % 30)}000`)
    );

    return () => clearTimeout(timeout);
  }, [otpAccounts]);

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
