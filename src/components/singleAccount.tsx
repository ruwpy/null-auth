import { useEffect, useState } from "react";
import { Icons } from "./icons";
import { motion as m, AnimatePresence } from "framer-motion";
import { ModalDelete } from "./modalDelete";
import { invoke } from "@tauri-apps/api";
import { IAccount } from "../types";
import { Button } from "./button";
import { toast } from "react-hot-toast";
import { decryptString } from "../lib/rustFunctions";
import { useUserStore } from "../store/useUserStore";

export const SingleAccount = ({ account }: { account: IAccount }) => {
  const [code, setCode] = useState("000000");
  const [deleteSecretModalOpen, setDeleteSecretModalOpen] = useState(false);
  const [codeReveal, setCodeReveal] = useState(false);
  const { user } = useUserStore();

  const getCode = async () => {
    const decryptedSecret = await decryptString(
      account.secret,
      `${user?.email!.split("@")[0]}-pass`
    );

    const code: string = await invoke("generate_totp", {
      secret: decryptedSecret,
    });

    setCode(code);
  };

  useEffect(() => {
    let firstRender = false;

    if (!firstRender) {
      getCode();
    }

    const interval = setInterval(() => {
      getCode();
    }, 5000);

    firstRender = true;

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCodeReveal(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [codeReveal]);
  const revealCode = () => {
    if (codeReveal) {
      navigator.clipboard.writeText(code);
      toast.success("Copied!");
    }

    setCodeReveal(true);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center border-b py-[20px] border-black/10">
        <div className="w-full flex gap-[15px]">
          <div
            onClick={() => revealCode()}
            className="font-code relative font-[600] text-[32px] rounded-[10px] cursor-pointer p-[10px]"
          >
            <AnimatePresence mode="wait">
              {!codeReveal && (
                <div className="bg-black/5 backdrop-blur-[9px] absolute inset-0 rounded-[10px] border border-black/5" />
              )}
            </AnimatePresence>
            <span className="select-none">{code}</span>
          </div>
          <span className="flex flex-col leading-[20px] justify-center">
            <span className="font-bold">{account.issuer.toUpperCase()}</span>
            <span className="text-black/50">{account.username}</span>
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
            idToDelete={account.id}
            modalOpen={deleteSecretModalOpen}
            setModalOpen={setDeleteSecretModalOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};
