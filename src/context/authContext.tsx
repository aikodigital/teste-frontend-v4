import { ReactNode, createContext, useContext, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { validateCredentials } from "../utils/authUtils";

interface User {
  email: string;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    if (validateCredentials(email, password)) {
      setUser({ email });
      navigate("/");
    } else {
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
