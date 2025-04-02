import Image from "next/image";
import errorImg from '@/assets/images/404.svg'
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import Cookies from "js-cookie";

interface Props {
    children: React.ReactNode
    code: "jwt expired" | null
}


const ErrorPageLogin: React.FC<Props> = ({ children, code }) => {

    if (code === "jwt expired") {
        Cookies.remove("auth_token");
    }

    return (<main className={`flex flex-col gap-2 bg-neutral-900 items-center w-full justify-center h-full min-h-screen`}>
        <Image width={300} src={errorImg} alt="" />
        <h1 className="text-6xl text-neutral-300 font-bold">Ups!</h1>
        <p className="italic text-sm text-neutral-400">Esta pagina no funciona</p>
        <span>{children}</span>
        <div><Button color="primary" variant="light"  >
            <Link href="/registrate" className="flex gap-2 items-center">
                <CiLogin size={30} />
                {"IR AL REGISTRO"}
            </Link>
        </Button>
        </div >
    </main >);
}

export default ErrorPageLogin;