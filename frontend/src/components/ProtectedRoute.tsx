import { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useContext(userContext);
  if (!isLoggedIn) {
    return <Navigate to="/Auth" />;
  }
  return <>{children}</>;
}
