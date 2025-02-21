import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function AuthSuccess() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (token) {
                Cookies.set("auth_token", token, { expires: 30 }); // Guarda el token en cookies por 30 días
                router.push("/"); // Redirige al home o dashboard
            } else {
                router.push("/login"); // Si no hay token, vuelve a login
            }
        }
    }, [router]);

    return <div className="text-center p-6">Procesando autenticación...</div>;
}