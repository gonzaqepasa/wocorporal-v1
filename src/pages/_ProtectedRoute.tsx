
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "./_AuthProvider";
import ErrorPageLogin from "@/components/Globals/pages/ErrorPagesLogin";
import LoadingMain from "@/components/Globals/loading/LoadingMain";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ("user" | "trainer" | "admin")[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // console.log("userafuera", user)
    if (isAuthenticated) {
      setIsLoading(false)
    } else if (user && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    } else {
      setIsLoading(false);
    }

  }, [user, isAuthenticated, router, allowedRoles]);



  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (user?.error) return <ErrorPageLogin code={user.error}>
    <p className="text-red-500 text-center">{user.error}</p>
  </ErrorPageLogin>


  if (!isAuthenticated) return <ErrorPageLogin code={user?.error}>
    <p className="text-red-500 text-center">Debes iniciar sesion para ver tu perfil</p>
  </ErrorPageLogin>
  if (isAuthenticated && user) return <>{children}</>;

  return <LoadingMain />

}
