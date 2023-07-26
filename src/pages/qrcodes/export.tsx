import { Button } from "@/components/ui/button";
import { useState } from "react";
import QRCode from "react-qr-code";

export const ExportPage = () => {
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  return (
    <div className="mt-[10px]">
      <div className="flex mt-[80px] items-center flex-col">
        <h1>Export accounts</h1>
        <span className="text-center text-[16px] leading-[20px]">
          Select accounts to export
        </span>
        <div
          className={`flex justify-center w-[300px] h-[300px] p-[10px] rounded-[10px] border border-black/10 mt-[10px] ${
            selectedAccounts.length === 0 ? "items-center" : ""
          }`}
        >
          <span className="select-none text-black/50">
            You have no accounts to export
          </span>
        </div>
        <Button disabled={selectedAccounts.length === 0} className="mt-[10px]">
          Export
        </Button>
      </div>
    </div>
  );
};
