import { useContextProvider } from "@/hooks/useContextProvider";
import { SingleAccount } from "../../components/singleAccount";
import { Timer } from "@/components/timer";

export const Accounts = () => {
  const { accounts } = useContextProvider();

  return accounts.length ? (
    <>
      <Timer />
      <div className="h-full overflow-y-scroll px-[20px] pb-[20px]">
        {accounts &&
          accounts.map((acc) => <SingleAccount key={acc.secret} account={acc} />)}
      </div>
    </>
  ) : (
    <div className="flex h-full justify-center mt-[200px]">
      <div className="text-[22px] text-center font-[600] text-neutral-900/50">
        Here will be listed your TOTP accounts
      </div>
    </div>
  );
};
