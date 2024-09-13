import React, { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  // Outros dados do usuário, se necessário
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const validateCredentials = (email: string, password: string) => {
    const validEmail = "operacao@example.com";
    const validPassword = "operacao123";

    if (email === validEmail && password === validPassword) {
      return true;
    } else {
      return false;
    }
  };

  const login = (email: string, password: string) => {
    const isAuthenticated = validateCredentials(email, password);

    if (isAuthenticated) {
      console.log("Usuário autenticado! Redirecionando...");
      const loggedInUser: User = { email }; // Crie o objeto de usuário autenticado com os dados necessários
      setUser(loggedInUser);
      navigate("/");
    } else {
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  const logout = () => {
    // Limpe os dados de autenticação, remova o usuário e faça as ações de logout necessárias
    console.log("Usuário deslogado! Redirecionando...");
    setUser(null); // Remove o usuário autenticado, simulando o logout
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

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
