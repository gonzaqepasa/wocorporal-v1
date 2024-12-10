import Image from "next/image";
import errorImg from '@/assets/images/404.svg'

const ErrorPageMain = ({ children }: { children: React.ReactNode }) => {
    return (<main className={`flex flex-col items-center justify-center min-h-screen`}>
        <Image width={300} src={errorImg} alt="" />
        <h1 className="text-6xl font-bold">Ups!</h1>
        <p className="italic text-sm text-neutral-400">Esta pagina no funciona</p>
        {children}
    </main>);
}

export default ErrorPageMain;