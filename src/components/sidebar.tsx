import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const { pathname } = useLocation();

  const LinkClassname = (path: string) => (path === pathname ? styles.active : "");

  return (
    <div className={styles.sidebar}>
      <div className={styles.buttonContainer}>
        <Link
          draggable={false}
          className={cn(styles.dashboardLink, LinkClassname("/passwords"))}
          to="/passwords"
        >
          <Button variant={"dashboardLink"}>
            <Icons.passwords width={35} height={35} className={styles.svgIcon} />
          </Button>
        </Link>
        <Link
          draggable={false}
          className={cn(styles.dashboardLink, LinkClassname("/cards"))}
          to="/cards"
        >
          <Button variant={"dashboardLink"}>
            <Icons.cards
              width={35}
              height={35}
              color="black"
              className={styles.svgIcon}
            />
          </Button>
        </Link>
        <Link
          draggable={false}
          className={cn(styles.dashboardLink, LinkClassname("/otp"))}
          to="/otp"
        >
          <Button variant={"dashboardLink"}>
            <Icons.otp width={35} height={35} className={styles.svgIcon} />
          </Button>
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link
          draggable={false}
          className={cn(styles.dashboardLink, LinkClassname("/settings"))}
          to="/settings"
        >
          <Button variant={"dashboardLink"}>
            <Icons.settings width={35} height={35} className={styles.svgIcon} />
          </Button>
        </Link>
      </div>
    </div>
  );
};
