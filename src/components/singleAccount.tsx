import { useEffect, useState } from "react";
import { Icons } from "./ui/icons";
import { motion as m, AnimatePresence } from "framer-motion";
import { ModalDelete } from "./modals/modalDelete";
import { invoke } from "@tauri-apps/api";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { decryptString } from "@/lib/rustFunctions";
import { useTimer } from "@/hooks/useTimer";
import { useContextProvider } from "@/hooks/useContextProvider";
import { IAccount } from "@/types";

export const SingleAccount = ({ account }: { account: IAccount }) => {
  const [code, setCode] = useState("000000");
  const [deleteSecretModalOpen, setDeleteSecretModalOpen] = useState(false);
  const [codeHovered, setCodeHovered] = useState(false);
  const { timeLeft } = useTimer();
  const { passphrase } = useContextProvider();

  const getCode = async () => {
    const decryptedSecret = await decryptString(account.secret, passphrase);

    const code: string = await invoke("generate_totp", {
      secret: decryptedSecret,
    });
    setCode(code);
    let timeout: NodeJS.Timeout | null = null;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => getCode(), 30000);
  };

  useEffect(() => {
    getCode();

    setTimeout(() => getCode(), Number(`${timeLeft}000`));
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center border-b py-[20px] border-black/10">
        <div className="w-full flex gap-[15px]">
          <div
            onClick={() => {
              navigator.clipboard.writeText(code);
              toast.success("Copied!");
            }}
            className="font-code relative font-[600] text-[32px] rounded-[10px] cursor-pointer p-[10px]"
          >
            <m.div
              onMouseEnter={() => setCodeHovered(true)}
              onMouseOut={() => setCodeHovered(false)}
              style={{
                opacity: codeHovered ? "0" : "1",
              }}
              className="bg-black/5 absolute backdrop-blur-[9px] transition-opacity inset-0 rounded-[10px] border border-black/5"
            />
            <span className="w-fit">{code}</span>
          </div>
          <span className="flex flex-col leading-[20px] overflow-hidden justify-center">
            <span className="font-bold text-ellipsis max-w-[100px] whitespace-nowrap">
              {account.issuer.toUpperCase()}
            </span>
            <span className="text-black/50 text-ellipsis w-[100px] whitespace-nowrap">
              {account.name?.split(":")[1]}
            </span>
          </span>
        </div>
        <Button
          onClick={() => setDeleteSecretModalOpen(true)}
          className="p-[10px] bg-white text-neutral-900 hover:bg-black/5 h-fit"
        >
          <Icons.trash width={20} height={20} />
        </Button>
      </div>
      <AnimatePresence mode="wait">
        {deleteSecretModalOpen && (
          <ModalDelete
            accountSecret={account.secret}
            modalOpen={deleteSecretModalOpen}
            setModalOpen={setDeleteSecretModalOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};
