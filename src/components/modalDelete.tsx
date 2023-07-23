import { db } from "@/lib/db";
import { useAccountsStore } from "@/store/useAccountsStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "./ui/button";
import { Modal, ModalProps } from "./modal";
import { toast } from "react-hot-toast";

interface ModalDeleteProps extends ModalProps {
  idToDelete: string | undefined;
}

export const ModalDelete = ({
  idToDelete,
  modalOpen,
  setModalOpen,
}: ModalDeleteProps) => {
  const { user } = useUserStore();
  const { deleteAccount } = useAccountsStore();

  const deleteHandle = async () => {
    try {
      await db.from("accounts").delete().eq("id", idToDelete);

      deleteAccount(idToDelete!);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div
        className="bg-white w-[300px] p-[20px] flex flex-col items-center text-center rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-[24px] font-medium">Delete account?</h1>
        <p className="mt-[10px]">You won't be able to undo this</p>
        <div className="flex mt-[20px] gap-[10px]">
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => deleteHandle()} className="bg-red-500">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
