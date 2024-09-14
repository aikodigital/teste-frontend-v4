import { useAuth } from "@/context/authContext";
import { type ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuestGuard = ({ children }: { children: ReactElement }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  return <>{children}</>;
};

export default GuestGuard;
