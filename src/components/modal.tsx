import { AnimatePresence, MotionProps, Variants, motion as m } from "framer-motion";
import { SetStateAction } from "react";
import { createPortal } from "react-dom";

export interface ModalProps extends MotionProps {
  children?: React.ReactNode;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const modalBgAnimation: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const Modal = ({ children, modalOpen, setModalOpen }: ModalProps) => {
  console.log(modalOpen);

  return createPortal(
    <AnimatePresence mode="wait">
      {modalOpen && (
        <m.div
          variants={modalBgAnimation}
          initial="initial"
          animate="animate"
          exit="initial"
          className="flex justify-center items-center fixed left-0 top-0 w-full h-full bg-black/50"
          onClick={() => setModalOpen(false)}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>,
    document.querySelector("#modal") as HTMLElement
  );
};
