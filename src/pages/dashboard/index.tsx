import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import { useLocation } from "react-router-dom";

export const MainPage = () => {
  const location = useLocation();

  if (location.pathname === "/") return <Navigate to="/accounts" />;

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="relative w-full bg-white">
        <Outlet />
      </div>
    </div>
  );
};
