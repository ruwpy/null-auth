import { createContext, useEffect, useState } from "react";
import { Icons } from "./ui/icons";
import { IOtp, IAppStoreData } from "@/types";
import { store } from "@/store";

export const AppContext = createContext<IAppStoreData | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [passphrase, setPassphrase] = useState<string>("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [otpAccounts, setOtpAccounts] = useState<IOtp[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      try {
        const passphrase = await store.getData("passphrase");
        if (passphrase) setPassphrase(passphrase);

        const otpAccounts = await store.getData("otps");
        if (otpAccounts) setOtpAccounts(otpAccounts);
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
        otpAccounts,
        isAuthenticated,
        setAuthenticated,
        setPassphrase,
        setOtpAccounts,
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
