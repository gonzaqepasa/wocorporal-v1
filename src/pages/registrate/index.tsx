import GoogleLoginButton from "@/components/Login/GoogleLogicButton";
import { Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
const LoginPage = () => {

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {

            const token = Cookies.get("auth_token"); // checkea si existe el token

            if (token) {
                router.push("/"); // Redirige al home o dashboard
            }
        }
    }, [router]);




    return (<>
        <main className="flex flex-col gap-8 row-start-2 min-h-screen justify-center items-center ">
            <h3 className="text-primary-500 mb-6">Inicio de sesión con Google</h3>
            <Card className="p-8" shadow="md">
                <GoogleLoginButton />
            </Card>

        </main>
    </>
    );
}

export default LoginPage;