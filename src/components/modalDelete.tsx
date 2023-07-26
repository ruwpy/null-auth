import { db } from "@/lib/db";
import { Button } from "./ui/button";
import { Modal, ModalProps } from "./modal";
import { toast } from "react-hot-toast";
import { useZustandStore } from "@/store/useZustandStore";

interface ModalDeleteProps extends ModalProps {
  accountSecret: string;
}

export const ModalDelete = ({
  accountSecret,
  modalOpen,
  setModalOpen,
}: ModalDeleteProps) => {
  const { deleteAccount } = useZustandStore();

  const deleteHandle = async () => {
    deleteAccount(accountSecret);
  };

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div
        className="bg-white w-[300px] p-[20px] flex flex-col items-center text-center rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Delete account?</h1>
        <p className="mt-[10px]">You won't be able to undo this</p>
        <div className="flex mt-[20px] gap-[10px]">
          <Button variant={"secondary"} onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button variant={"primary"} onClick={() => deleteHandle()}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
