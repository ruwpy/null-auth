import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  protectedPage: React.ReactNode;
  isAuth: boolean;
}

export const ProtectedRoute = ({ isAuth, protectedPage }: ProtectedRouteProps) => {
  if (!isAuth) return <Navigate to="/login" />;

  return protectedPage;
};
