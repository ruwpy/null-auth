import { MotionProps, Variants, motion as m } from "framer-motion";
import React, { SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal-wrapper.module.scss";

export interface ModalProps extends MotionProps {
  children?: React.ReactNode;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const appearAnimation: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const Modal = ({ children, setModalOpen }: ModalProps) => {
  const closeOnEsc = (k: string) => {
    if (k === "Escape") {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    const listenerArgs: ["keydown", (e: KeyboardEvent) => void] = [
      "keydown",
      (e) => closeOnEsc(e.key),
    ];

    document.addEventListener(...listenerArgs);

    return () => document.removeEventListener(...listenerArgs);
  }, []);

  return createPortal(
    <m.div
      variants={appearAnimation}
      transition={{ duration: 0.08 }}
      initial="initial"
      animate="animate"
      exit="initial"
      className={styles.modalWrapper}
      onClick={() => setModalOpen(false)}
    >
      {children}
    </m.div>,
    document.querySelector("#modal") as HTMLElement
  );
};
