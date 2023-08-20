import { useTimer } from "@/hooks/useTimer";

export const Timer = () => {
  const { timeLeft } = useTimer();

  return (
    <div className="w-full">
      <div
        className="h-[10px] bg-neutral-900 transition-all"
        style={{ width: `${timeLeft * (100 / 30)}%` }}
      />
    </div>
  );
};
