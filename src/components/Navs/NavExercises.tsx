// components/NavBar.tsx
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
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
                <Dropdown className='dark'>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Ejercicios
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new">
                            <Link
                                className={`${router.pathname === '/exercises' ? "bg-primary-400 p-1 px-2 rounded" : ""}`}
                                href={`/exercises`}>
                                Lista de ejercicios
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="new">
                            <Link
                                className={`${router.pathname === '/exercises/add' ? "bg-primary-400 p-1 px-2 rounded" : ""}`}
                                href={`/exercises/add`}>
                                Agregar
                            </Link>
                        </DropdownItem>


                    </DropdownMenu>
                </Dropdown>
                <Dropdown className='dark'>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Sets
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new">
                            <Link
                                className={`${router.pathname === '/sets' ? "bg-primary-400 p-1 px-2 rounded" : ""}`}
                                href={`/sets`}>
                                Lista de sets
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="new">
                            <Link
                                className={`${router.pathname === '/sets/create' ? "bg-primary-400 p-1 px-2 rounded" : ""}`}
                                href={`/sets/create`}>
                               Crear Set
                            </Link>
                        </DropdownItem>


                    </DropdownMenu>
                </Dropdown>

            </NavbarContent>
        </Navbar>
    );
};

export default NavBarExercises;
