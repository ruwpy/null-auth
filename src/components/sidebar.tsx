import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import styles from "./sidebar.module.scss";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.buttonContainer}>
        <Link
          draggable={false}
          activeProps={{
            className: styles.active,
          }}
          className={styles.dashboardLink}
          to="/passwords"
        >
          <Button tabIndex={-1} variant={"dashboardLink"}>
            <Icons.passwords width={35} height={35} className={styles.svgIcon} />
          </Button>
        </Link>
        <Link
          draggable={false}
          activeProps={{
            className: styles.active,
          }}
          className={styles.dashboardLink}
          to="/cards"
        >
          <Button tabIndex={-1} variant={"dashboardLink"}>
            <Icons.cards width={35} height={35} color="black" className={styles.svgIcon} />
          </Button>
        </Link>
        <Link
          draggable={false}
          activeProps={{
            className: styles.active,
          }}
          className={styles.dashboardLink}
          to="/otp"
        >
          <Button tabIndex={-1} variant={"dashboardLink"}>
            <Icons.otp width={35} height={35} className={styles.svgIcon} />
          </Button>
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link
          draggable={false}
          activeProps={{
            className: styles.active,
          }}
          className={styles.dashboardLink}
          to="/settings"
        >
          <Button tabIndex={-1} variant={"dashboardLink"}>
            <Icons.settings width={35} height={35} className={styles.svgIcon} />
          </Button>
        </Link>
      </div>
    </div>
  );
};
