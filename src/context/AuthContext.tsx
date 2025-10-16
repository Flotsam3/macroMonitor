import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin, register as apiRegister, logout as apiLogout, getProfile } from "../services/api";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem("token");
    if (token) {
      getProfile().then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    if (data?.user) {
      setUser(data.user);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    const data = await apiRegister(email, password, name);
    if (data?.user) {
      setUser(data.user);
    }
  };

  const logout = () => {
    setUser(null);
    apiLogout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};