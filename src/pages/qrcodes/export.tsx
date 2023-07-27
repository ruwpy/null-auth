import { ModalExport } from "@/components/modals/modalExport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useZustandStore } from "@/store/useZustandStore";
import { IAccount } from "@/types";
import { useState } from "react";
import QRCode from "react-qr-code";

export const ExportPage = () => {
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<IAccount[]>([]);
  const { accounts } = useZustandStore();

  const selectAccount = (account: IAccount) => {
    if (selectedAccounts.some((acc) => acc.secret === account.secret))
      return setSelectedAccounts(
        selectedAccounts.filter((acc) => acc.secret !== account.secret)
      );

    setSelectedAccounts([account, ...selectedAccounts]);
  };

  return (
    <>
      <div className="mt-[10px]">
        <div className="flex mt-[80px] items-center flex-col">
          <h1>Export accounts</h1>
          <span className="text-center text-[16px] leading-[20px]">
            Select accounts to export
          </span>
          <div
            className={`flex flex-col w-[300px] h-[300px] gap-[20px] overflow-y-scroll p-[10px] rounded-[10px] border border-black/10 mt-[10px] ${
              !accounts.length ? "items-center justify-center" : ""
            }`}
          >
            {accounts.length ? (
              accounts.map((acc) => {
                const { issuer, secret, name } = acc;

                return (
                  <div
                    onClick={() => selectAccount(acc)}
                    key={secret}
                    className="relative cursor-pointer flex justify-between items-center"
                  >
                    <span className="flex flex-col">
                      <span>{issuer}</span>
                      <span className="inline-block text-[14px] text-black/50 max-w-[200px] overflow-hidden text-ellipsis">
                        {name?.split(":")[1]}
                      </span>
                    </span>
                    <Input
                      type="checkbox"
                      readOnly
                      checked={selectedAccounts.some((acc) => acc.secret === secret)}
                      className="w-[20px] h-[20px] outline-0 focus:ring-0"
                    />
                  </div>
                );
              })
            ) : (
              <span className="select-none text-black/50">
                You have no accounts to export
              </span>
            )}
          </div>
          <Button
            onClick={() => setExportModalOpen(true)}
            disabled={selectedAccounts.length === 0}
            className="mt-[10px]"
          >
            Export
          </Button>
        </div>
      </div>
      {exportModalOpen && (
        <ModalExport
          accountsToExport={selectedAccounts}
          modalOpen={exportModalOpen}
          setModalOpen={setExportModalOpen}
        />
      )}
    </>
  );
};
