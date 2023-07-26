import { useZustandStore } from "@/store/useZustandStore";
import { SingleAccount } from "../../components/singleAccount";
import { useTimer } from "@/hooks/useTimer";

export const Accounts = () => {
  const { accounts } = useZustandStore();
  const { timeLeft } = useTimer();

  return accounts.length ? (
    <>
      <div className="w-full">
        <div
          className="h-[10px] bg-neutral-900 transition-all"
          style={{ width: `${timeLeft * (100 / 30)}%` }}
        />
      </div>
      <div className="h-full overflow-y-scroll px-[20px]">
        {accounts &&
          accounts.map((acc) => (
            <SingleAccount key={acc.secret} account={acc} timeLeft={timeLeft} />
          ))}
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
