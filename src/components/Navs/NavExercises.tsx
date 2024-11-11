// components/NavBar.tsx
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';


const NavBarExercises: React.FC = () => {
    const router = useRouter()

    return (
        <Navbar isBordered >
            <NavbarBrand>
                <span className="text-lg font-bold">Wo Corporal</span>
            </NavbarBrand>
            <NavbarContent>
                <Link
                    className={`${router.pathname === '/exercises' ? "bg-primary-400 p-1 px-2 rounded" : ""}`}
                    href="/exercises"
                >
                    Lista
                </Link>
                <Link
                    // isActive={router.pathname === '/exercises/add'}
                    className={`${router.pathname === '/exercises/add' ? "bg-primary-400 p-1 px-2 rounded" : ""}`}


                    href="/exercises/add"
                >
                    Agregar
                </Link>
            </NavbarContent>
        </Navbar>
    );
};

export default NavBarExercises;
