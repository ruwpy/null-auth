import { Button } from "./button";
import { Modal, ModalProps } from "./modal";

export const ModalDelete = ({ modalOpen, setModalOpen }: ModalProps) => {
  const deleteHandle = () => {
    // logic for deletion
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
