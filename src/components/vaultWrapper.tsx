import { useEffect, useState } from "react";
import { VaultRegisterPage } from "@/components/vault/vault-register";
import { VaultAuthenticatePage } from "@/components/vault/vault-auth";
import { useContextProvider } from "@/hooks/useContextProvider";

export const VaultWrapper = ({ children }: { children: JSX.Element }) => {
  const [pageToDisplay, setPageToDisplay] = useState<
    "authenticated" | "unregistered" | "unauthenticated" | null
  >(null);
  const { isLoading, passphrase, hashedPassphrase } = useContextProvider();

  const pages = {
    authenticated: children,
    unregistered: <VaultRegisterPage />,
    unauthenticated: <VaultAuthenticatePage />,
  };

  useEffect(() => {
    if (!isLoading) {
      if (!hashedPassphrase) setPageToDisplay("unregistered");
      if (hashedPassphrase) setPageToDisplay("unauthenticated");
      if (hashedPassphrase && passphrase) setPageToDisplay("authenticated");
    }
  }, [hashedPassphrase, passphrase]);

  if (pageToDisplay !== null) {
    return pages[pageToDisplay];
  }
};
