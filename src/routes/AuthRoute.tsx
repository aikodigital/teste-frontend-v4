import { useAuth } from "@/context/authContext";
import { type ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: ReactElement }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login", { replace: true });
    }
  }, [auth, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
