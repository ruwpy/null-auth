import { Modal, ModalProps } from "./modal";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { decryptString } from "@/lib/rustFunctions";
import { Button } from "../ui/button";
import { useContextProvider } from "@/hooks/useContextProvider";
import { IAccount } from "@/types";

interface ModalExportProps extends ModalProps {
  accountsToExport: IAccount[];
}

export const ModalExport = ({
  accountsToExport,
  setModalOpen,
  ...props
}: ModalExportProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentAccount, setCurrentAccount] = useState<IAccount>(
    accountsToExport[currentPage]
  );
  const [otpauthLink, setOtpauthLink] = useState("");
  const { passphrase } = useContextProvider();

  useEffect(() => {
    const nextAccount = async () => {
      const account = accountsToExport[currentPage];

      const secret = await decryptString(account.secret, passphrase);

      setCurrentAccount({
        ...account,
        secret,
      });

      setOtpauthLink(
        `otpauth://totp/${account.name ?? "nullauth"}?secret=${secret}&issuer=${
          account.issuer
        }`
      );
    };

    nextAccount();
  }, [currentPage]);

  return (
    <Modal setModalOpen={setModalOpen} {...props}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white flex flex-col gap-[10px] items-center p-[20px] rounded-[10px] w-[300px]"
      >
        <span className="text-[14px] text-black/50">
          Page {currentPage + 1} of {accountsToExport.length}
        </span>
        <QRCode value={otpauthLink} />
        <span className="flex flex-col leading-[22px] mt-[10px] items-center">
          <span className="font-[600] text-[20px]">{currentAccount.issuer}</span>
          <span className="text-black/50">{currentAccount.name?.split(":")[1]}</span>
        </span>
        {currentPage + 1 !== accountsToExport.length ? (
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="mt-[10px]"
          >
            Next QR code
          </Button>
        ) : (
          <Button onClick={() => setModalOpen(false)} className="mt-[10px]">
            Complete
          </Button>
        )}
      </div>
      ;
    </Modal>
  );
};
