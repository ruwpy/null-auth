import { useEffect, useState } from "react";
import { VaultRegisterPage } from "@/pages/vault/vaultRegister";
import { VaultAuthenticatePage } from "@/pages/vault/vaultAuthenticate";
import { useContextProvider } from "@/hooks/useContextProvider";

export const VaultWrapper = ({ children }: { children: React.ReactNode }) => {
  const [pageToDisplay, setPageToDisplay] = useState<
    "authenticated" | "unregistered" | "unauthenticated"
  >("unregistered");
  const { passphrase, isAuthenticated } = useContextProvider();

  const pages = {
    authenticated: children,
    unregistered: <VaultRegisterPage />,
    unauthenticated: <VaultAuthenticatePage />,
  };

  useEffect(() => {
    if (passphrase) setPageToDisplay("unauthenticated");
    if (passphrase && isAuthenticated) setPageToDisplay("authenticated");
  }, [passphrase, isAuthenticated]);

  return pages[pageToDisplay];
};
