import { AppContext } from "@/components/dataProvider";
import { useContext } from "react";

export const useContextProvider = () => {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error("useContextProvider must be called within app provider");
  }

  return context;
};
