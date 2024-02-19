import { Variants } from "framer-motion";
import { Modal, ModalProps } from "../modal-wrapper/modal-wrapper";
import styles from "./modal-center.module.scss";
import { motion as m } from "framer-motion";
import { Icons } from "@/components/ui/icons/icons";
import { constants } from "@/lib/constants";
import { ReactNode } from "react";
import { animations } from "@/lib/animations";

interface CenterModalProps extends ModalProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

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
          className={styles.modalContent}
          {...animations.enter}
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
