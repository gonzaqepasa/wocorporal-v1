import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";




const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      fetch("http://localhost:3002/api/user/byToken", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => setUser({ ...data, token }))
        .catch((error) => {
          console.error("Error fetching user data", error);
          Cookies.remove("auth_token");
        });
    }
  }, []);

  const logout = () => {
    Cookies.remove("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
