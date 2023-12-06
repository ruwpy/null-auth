import { useZustandStore } from "@/store/useZustandStore";
import { useEffect, useState } from "react";

export const VaultWrapper = ({ children }: { children: React.ReactNode }) => {
  const { getAccounts, getPassphrase } = useZustandStore();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await getAccounts();
        await getPassphrase();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return isLoading ? <div>Loading</div> : <div>{children}</div>;
};
