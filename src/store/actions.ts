import { encryptString, verifyHash } from "@/lib/rustFunctions";
import { store } from ".";
import { IAccount } from "@/types";
import { useContextProvider } from "@/hooks/useContextProvider";

export const getPassphrase = async () => {
  const passphrase = (await store.get("passphrase")) as string | null;
  return passphrase;
};

export const getAccounts = async () => {
  const accounts = (await store.get("accounts")) as IAccount[] | null;
  return accounts;
};

export const savePassphrase = async ({ passphrase }: { passphrase: string }) => {
  await store.set("passphrase", passphrase);
  await store.save();
};

export const addAccount = async ({
  account,
  passphrase,
}: {
  account: IAccount;
  passphrase: string;
}) => {
  const accounts = (await store.get("accounts")) as IAccount[];
  const encryptedSecret = await encryptString(account.secret, passphrase);

  if (accounts && accounts.some((acc) => acc.secret === encryptedSecret)) return;

  if (accounts) {
    await store.set("accounts", [
      ...accounts,
      {
        ...account,
        secret: encryptedSecret,
      },
    ]);
  } else {
    await store.set("accounts", [
      {
        ...account,
        secret: encryptedSecret,
      },
    ]);
  }

  return encryptedSecret;
};

export const deleteAccount = async ({ accountSecret }: { accountSecret: string }) => {
  const accounts = (await store.get("accounts")) as IAccount[];
  if (accounts.some((acc) => acc.secret === accountSecret))
    return await store.set(
      "accounts",
      accounts.filter((acc) => acc.secret !== accountSecret)
    );
};
