import { useState } from "react";
import { Icons } from "../components/icons";
import { ModalCreate } from "../components/modalCreate";
import { AnimatePresence } from "framer-motion";
import { Accounts } from "../components/accounts";
import { Button } from "../components/button";
import { useUserStore } from "../store/useUserStore";
import { useAccountsStore } from "../store/useAccountsStore";
import { db } from "../lib/db";

export const MainPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { user } = useUserStore();
  const { clearStore } = useAccountsStore();

  return (
    <>
      <div className="mt-[30px] bg-white px-[20px]">
        <Accounts />
      </div>
      <div className="flex gap-[5px] fixed bottom-[20px] right-[20px]">
        <Button
          onClick={() => setCreateModalOpen(true)}
          className=" p-[10px] rounded-[10px]"
        >
          <Icons.plus className="text-white" />
        </Button>
        <Button
          onClick={async () => {
            clearStore();
            await db.auth.signOut();
          }}
          className=" p-[10px] rounded-[10px]"
        >
          <Icons.logout className="text-white" />
        </Button>
      </div>
      <AnimatePresence mode="wait">
        {createModalOpen && (
          <ModalCreate modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} />
        )}
      </AnimatePresence>
    </>
  );
};
