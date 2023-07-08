import {
  AnimatePresence,
  MotionProps,
  Variants,
  delay,
  motion as m,
} from "framer-motion";
import { SetStateAction } from "react";
import { createPortal } from "react-dom";

export interface ModalProps extends MotionProps {
  children?: React.ReactNode;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const appearAnimation: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const Modal = ({ children, modalOpen, setModalOpen }: ModalProps) => {
  return createPortal(
    <m.div
      variants={appearAnimation}
      transition={{ duration: 0.1 }}
      initial="initial"
      animate="animate"
      exit="initial"
      className="flex justify-center items-center fixed left-0 top-0 w-full h-full bg-black/50"
      onClick={() => setModalOpen(false)}
    >
      {children}
    </m.div>,
    document.querySelector("#modal") as HTMLElement
  );
};
