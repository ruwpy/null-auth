import { deleteAccount } from "@/store/actions";
import { Button } from "../ui/button";
import { Modal, ModalProps } from "./modal";
import { useContextProvider } from "@/hooks/useContextProvider";

interface ModalDeleteProps extends ModalProps {
  accountSecret: string;
}

export const ModalDelete = ({
  accountSecret,
  modalOpen,
  setModalOpen,
}: ModalDeleteProps) => {
  const { accounts, setAccounts } = useContextProvider();

  const deleteHandle = async () => {
    try {
      deleteAccount({ accountSecret });
      setAccounts(accounts.filter((acc) => acc.secret !== accountSecret));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div
        className="bg-white w-[300px] p-[20px] flex flex-col items-center text-center rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Delete account?</h2>
        <p className="mt-[10px]">
          Removing this account will remove your ability to generate codes, make sure to
          have alternate mechanism for generating codes
        </p>
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
