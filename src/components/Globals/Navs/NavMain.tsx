// components/NavBar.tsx
import { useAuth } from '@/pages/_AuthProvider';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, User } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavAdmin from './Navs/NavAdmin';



const NavMain: React.FC = () => {
    const router = useRouter()
    const { user, isAuthenticated, logout } = useAuth()
    console.log(user?.role)

    if (!user) return
    if (user?.role === "admin") return <NavAdmin user={user} isAuthenticated logout={logout} />
    if (user?.role === "trainer") return <>TRAINER</>
    if (user?.role === "user") return <>USER</>





    return (
        <Navbar isBordered className="bg-primary-500 text-white ">
            <NavbarBrand>
                <Link href="/">
                    <span className="text-lg font-bold">Wo Corporal</span>
                </Link>
            </NavbarBrand>
            <NavbarContent>

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
            <NavbarContent>
                <NavbarItem>

                    {!isAuthenticated ? <Link
                        className={`${router.pathname === '/registrate' ? "bg-primary-400 p-1 px-2 rounded" : ""}`}
                        href="/registrate"
                    >
                        Registrate
                    </Link> : <Link href={`${user?.role}/dashboard`}>
                        <User

                            avatarProps={{
                                src: user?.image
                            }} name={user?.name} description={user?.email} />
                    </Link>
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default NavMain;
