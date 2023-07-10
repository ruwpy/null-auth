import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  boolean: boolean;
  children: JSX.Element;
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

  return <div />;
};
