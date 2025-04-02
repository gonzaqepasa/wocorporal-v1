import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    href: string
    title: string
    icon?: React.ReactNode
}

const NavLinks: React.FC<Props> = ({ href, icon, title }) => {
    const router = useRouter()

    return (
        <Button variant="light" className="p-0 m-0 h-auto flex items-center ">
            <Link
                className={`flex  items-center w-full gap-1 hover:translate-x-2 hover:opacity-70  transition ${router.pathname === href && ""} `}
                href={href}>{icon && icon} {title}</Link>
        </Button>
    );
}

export default NavLinks;