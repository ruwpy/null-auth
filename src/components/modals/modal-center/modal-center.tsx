import { Variants } from "framer-motion";
import { Modal, ModalProps } from "../modal-wrapper/modal-wrapper";
import styles from "./modal-center.module.scss";
import { motion as m } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { constants } from "@/lib/constants";
import { ReactNode } from "react";

interface CenterModalProps extends ModalProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

const variants: Variants = {
  initial: { y: "15px", scale: 0.95 },
  animate: { y: "0px", scale: 1, transition: { duration: 0.2, ease: "easeInOut" } },
  exit: { y: "0", scale: 0.9 },
};

export const CenterModal = ({
  modalOpen,
  setModalOpen,
  title,
  children,
  description,
}: CenterModalProps) => {
  return (
    <Modal {...{ modalOpen, setModalOpen }}>
      <div className={styles.sideModalContainer}>
        <m.div
          onClick={(e) => e.stopPropagation()}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.modalContent}
        >
          <div onClick={() => setModalOpen(false)} className={styles.closeIcon}>
            <Icons.x color={constants.colors.accent} />
          </div>
          <div>
            <h1>{title}</h1>
            <p className={styles.description}>{description}</p>
            <div>{children}</div>
          </div>
        </m.div>
      </div>
    </Modal>
  );
};
