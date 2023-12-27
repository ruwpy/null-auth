import { constants } from "@/lib/constants";
import { Icons } from "./ui/icons";
import styles from "./buttonMore.module.scss";

export const ButtonMore = () => {
  return (
    <span onClick={(e) => e.stopPropagation()} className={styles.moreButton}>
      <Icons.more width={24} height={24} color={constants.colors.accent} />
    </span>
  );
};
