import { Sidebar } from "@/components/sidebar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import styles from "./root.module.scss";

const Root = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export const Route = createRootRoute({
  component: Root,
});
