import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import { useLocation } from "react-router-dom";
import styles from "./index.module.scss";

export const MainPage = () => {
  const location = useLocation();

  if (location.pathname === "/") return <Navigate to="/passwords" />;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
};
