import { Variants } from "framer-motion";
import { Modal, ModalProps } from "../modal-wrapper/modal-wrapper";
import styles from "./modal-side.module.scss";
import { motion as m } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { constants } from "@/lib/constants";
import { ReactNode } from "react";

interface SideModalProps extends ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const variants: Variants = {
  initial: { x: "300px" },
  animate: { x: "0px", transition: { duration: 0.15 } },
};

export const SideModal = ({
  modalOpen,
  setModalOpen,
  title,
  children,
  description,
}: SideModalProps) => {
  return (
    <Modal {...{ modalOpen, setModalOpen }}>
      <div className={styles.sideModalContainer}>
        <m.div
          onClick={(e) => e.stopPropagation()}
          variants={variants}
          initial="initial"
          animate="animate"
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
