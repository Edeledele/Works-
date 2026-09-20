import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Guards a route: redirects to /sign-in and remembers where the user was
// headed, so they land back on it right after signing in.
export default function RequireAuth({ children }) {
  const { isSignedIn } = useAuth();
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
}
