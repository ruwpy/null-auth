import { useEffect, useState } from "react";
import { useAccountsStore } from "../store/useAccountsStore";
import { db } from "../lib/db";
import { useUserStore } from "../store/useUserStore";
import { SingleAccount } from "./singleAccount";

export const Accounts = () => {
  const { accounts, getAccounts } = useAccountsStore();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserStore();

  useEffect(() => {
    const getAccountsFromDb = async () => {
      try {
        const { data } = await db.from("accounts").select().eq("user_id", user?.id);

        getAccounts(data!);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getAccountsFromDb();
  }, []);

  return isLoading ? (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="w-[30px] h-[30px] rounded-full border-[5px] border-neutral-900 border-b-transparent animate-spin"></div>
    </div>
  ) : (
    <div>
      {accounts && accounts.map((acc) => <SingleAccount key={acc.id} account={acc} />)}
    </div>
  );
};
