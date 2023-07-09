import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProtectedRouteProps) => {
  const { session, loading } = useAuth();

  if (!session && !loading) return <Navigate to="/login" />;

  return !loading && children;
};
