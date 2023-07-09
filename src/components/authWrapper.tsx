import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  boolean: boolean;
  children: React.ReactNode;
  redirectTo: string;
}

export const AuthWrapper = ({ boolean, children, redirectTo }: ProtectedRouteProps) => {
  const { loading } = useAuth();

  if (!loading) {
    if (boolean) {
      return children;
    } else {
      return <Navigate to={redirectTo} />;
    }
  }
};
