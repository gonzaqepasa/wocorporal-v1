
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "./_AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ("user" | "trainer" | "admin")[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/registrate");
    } else if (user && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    } else {
      setIsLoading(false);
    }
  }, [user, isAuthenticated, router, allowedRoles]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return <>{children}</>;
}
