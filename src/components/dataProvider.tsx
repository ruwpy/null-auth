import { getAccounts, getPassphrase } from "@/store/actions";
import { createContext, useEffect, useState } from "react";
import { Icons } from "./ui/icons";
import { IAccount, IAppStoreData } from "@/types";

export const AppContext = createContext<IAppStoreData | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [passphrase, setPassphrase] = useState<string>("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      try {
        const passphrase = await getPassphrase();
        if (passphrase) setPassphrase(passphrase);

        const accounts = await getAccounts();
        if (accounts) setAccounts(accounts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        passphrase,
        accounts,
        isAuthenticated,
        setAuthenticated,
        setPassphrase,
        setAccounts,
      }}
    >
      {isLoading ? (
        <div className="w-full h-[100dvh] flex justify-center items-center">
          <Icons.loading className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};
