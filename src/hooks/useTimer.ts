import { useEffect, useState } from "react";

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(
    30 - Math.floor((new Date(Date.now()).getTime() / 1000) % 30)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(30 - Math.floor((new Date(Date.now()).getTime() / 1000) % 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { timeLeft };
};
