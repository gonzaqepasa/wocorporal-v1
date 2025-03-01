
import { GOOGLE_AUTH_URL } from "@/config/env_d";
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
    const handleLogin = () => {
      window.location.href = GOOGLE_AUTH_URL;
    };
  
    return (
      <Button onClick={handleLogin} className="flex items-center gap-2 p-3 border rounded-lg shadow-md">
        <FcGoogle size={24} />
        <span>Iniciar sesión con Google</span>
      </Button>
    );
  }