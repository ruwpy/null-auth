import { useEffect, useState } from "react";

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(30 - Math.floor((new Date(Date.now()).getTime() / 1000.0) % 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log(timeLeft);

  return { timeLeft };
};
