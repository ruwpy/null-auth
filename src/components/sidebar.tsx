import { AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ModalCreate } from "./modalCreate";
import { Icons } from "./ui/icons";
import { useState } from "react";
import { db } from "@/lib/db";
import { useAccountsStore } from "@/store/useAccountsStore";

export const Sidebar = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { clearStore } = useAccountsStore();

  return (
    <div className="flex flex-col justify-between p-[8px] border-r border-black/10 mt-[30px]">
      <div className="flex flex-col items-center gap-[5px] w-full">
        <Button
          onClick={() => setCreateModalOpen(true)}
          className=" p-[10px] rounded-[10px]"
        >
          <Icons.plus className="text-white" />
        </Button>
      </div>
      <div className="flex flex-col justify-end items-center gap-[5px] w-full">
        <Button className="p-[10px] rounded-[10px]">
          <Icons.settings className="text-white" />
        </Button>
        <Button
          onClick={async () => {
            clearStore();
            await db.auth.signOut();
          }}
          className="p-[10px] rounded-[10px]"
        >
          <Icons.logout className="text-white" />
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {createModalOpen && (
          <ModalCreate modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} />
        )}
      </AnimatePresence>
    </div>
  );
};
