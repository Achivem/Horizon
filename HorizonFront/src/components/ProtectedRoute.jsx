import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { isTokenExpired } from "../utils/tokenUtils";

function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  if (isTokenExpired(token)) {
    logout();
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
