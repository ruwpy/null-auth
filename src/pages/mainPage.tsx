import { useState } from "react";
import { Icons } from "../components/icons";
import { SingleAccount } from "../components/singleAccount";
import { ModalCreate } from "../components/modalCreate";
import { AnimatePresence } from "framer-motion";

export const MainPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <div className="mt-[30px] bg-white px-[20px]">{/* accounts */}</div>
      <button
        onClick={() => setCreateModalOpen(true)}
        className="fixed bottom-[20px] right-[20px] p-[10px] rounded-[10px] bg-neutral-900 hover:bg-neutral-800"
      >
        <Icons.plus className="text-white" />
      </button>
      <AnimatePresence mode="wait">
        {createModalOpen && (
          <ModalCreate modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} />
        )}
      </AnimatePresence>
    </>
  );
};
