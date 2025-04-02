import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    href: string
    pathname: string
    title: string
    icon?: React.ReactNode
}

const NavLinks: React.FC<Props> = ({ href, icon, title }) => {
    const router = useRouter()
    const disabled = href.includes(router.asPath)
    return (
        <Button variant="light" className="p-0 m-0 h-auto w-full flex items-center " isDisabled={disabled} >
            <Link
                className={`flex  items-center w-full gap-1 hover:translate-x-2 hover:opacity-70  transition ${disabled && ""} `}
                href={href}>{icon && icon} {title}</Link>
        </Button>
    );
}

export default NavLinks;