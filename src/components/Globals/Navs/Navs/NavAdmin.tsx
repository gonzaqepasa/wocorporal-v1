import { TypesUser } from '@/types/user';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, User } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MyUserCard from '../../Perfil/MyUserCard';
import NavLinks from './Links/NavLinks';
import { SiTrainerroad } from 'react-icons/si';
import { RiAdminFill } from 'react-icons/ri';
import { FaClipboardList, FaDumbbell, FaPlusCircle, FaUserFriends } from 'react-icons/fa';

interface Props {
    user: TypesUser
    isAuthenticated: boolean
    logout: () => void
}










const NavAdmin: React.FC<Props> = ({ user, isAuthenticated }) => {
    const router = useRouter()
    const enlaces = {
        dashboards: [
            {
                title: "Panel de Admin",
                href: "/admin/dashboard",
                icon: <RiAdminFill size={23} />
            },
            {
                title: "Panel de Entrenador",
                href: "/trainer/dashboard",
                icon: <SiTrainerroad size={23} />
            }
        ],
        users: [
            {
                title: "Usuarios",
                href: `/trainer/users?apiKey=${user.apiKey}`,
                icon: <FaUserFriends size={20} />
            }
        ],
        routines: [
            {
                title: "Rutinas",
                href: `/trainer/rutinas?apiKey=${user.apiKey}`,
                icon: <FaClipboardList size={16} />
            },
            {
                title: "Crear Rutina",
                href: "/trainer/rutinas/create",
                icon: <FaPlusCircle size={16} />
            }
        ],
        sets: [
            {
                title: "Sets",
                href: `/trainer/sets?apiKey=${user.apiKey}`,
                icon: <FaDumbbell size={16} />
            },
            {
                title: "Crear Set",
                href: "/trainer/sets/create",
                icon: <FaPlusCircle size={16} />
            }
        ],
        admin: [
            {
                title: "Ejercicios",
                href: `/admin/exercises?apiKey=${user.apiKey}`,
                icon: <FaDumbbell size={16} />
            },
            {
                title: "Agregar Ejercicio",
                href: "/admin/exercises/add",
                icon: <FaPlusCircle size={16} />
            }
        ]
    };

    return (
        <Navbar isBordered className=" bg-neutral-900 text-neutral-200   ">
            <NavbarContent           >
                <NavbarMenuToggle
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/">
                        <span className="text-lg font-bold">Wo Corporal</span>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className='hidden sm:flex' justify='center'>
                <Dropdown className='dark flex flex-col gap-2 my-2'>
                    <DropdownTrigger>
                        <Button variant="faded" color='default' className='dark'>Paneles</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem>
                            <NavLinks href='/admin/dashboard' pathname={router.pathname} title='Panel de Admin' icon={<RiAdminFill size={20} />} />
                        </DropdownItem>
                        <DropdownItem>
                            <NavLinks href='/trainer/dashboard' pathname={router.pathname} title='Panel de Entrenador' icon={<SiTrainerroad size={23} />} />
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex " justify='end'>
                <NavbarItem>
                    {!isAuthenticated ? <Link
                        className={`${router.pathname === '/registrate' ? "bg-primary-400 p-1 px-2 rounded" : ""}`}
                        href="/registrate"
                    >
                        Registrate
                    </Link> : <Link href={`admin/dashboard`}>
                        <User
                            avatarProps={{
                                src: user?.image
                            }} name={user?.name} description={user?.email} />
                    </Link>
                    }
                </NavbarItem>
            </NavbarContent>








            <NavbarMenu className='bg-black/50 dark'>
                <NavbarItem>
                    <MyUserCard config={{ imgSize: 60 }} />
                </NavbarItem>

                <NavbarItem>
                    <div className="flex flex-col gap-2 my-2 scale-105">

                        {enlaces.dashboards.map((l) => (
                            <NavLinks pathname={router.pathname} key={l.title} href={l.href} title={l.title} icon={l.icon} />
                        ))}
                    </div>
                </NavbarItem>

                <NavbarItem>
                    <div className="flex flex-col gap-2 my-2">
                        <span className="font-bold text-sm">Usuarios</span>
                        {enlaces.users.map((l) => (
                            <NavLinks pathname={router.pathname} key={l.title} href={l.href} title={l.title} icon={l.icon} />
                        ))}
                    </div>
                </NavbarItem>

                <NavbarItem>
                    <div className="flex flex-col gap-2 my-2">
                        <span className="font-bold text-sm">Rutinas</span>
                        {enlaces.routines.map((l) => (
                            <NavLinks pathname={router.pathname} key={l.title} href={l.href} title={l.title} icon={l.icon} />
                        ))}
                    </div>
                </NavbarItem>

                <NavbarItem>
                    <div className="flex flex-col gap-2 my-2">
                        <span className="font-bold text-sm">Sets</span>
                        {enlaces.sets.map((l) => (
                            <NavLinks pathname={router.pathname} key={l.title} href={l.href} title={l.title} icon={l.icon} />
                        ))}
                    </div>
                </NavbarItem>

                <NavbarItem>
                    <div className="flex flex-col gap-2 my-2">
                        <span className="font-bold text-sm">Admin</span>
                        {enlaces.admin.map((l) => (
                            <NavLinks pathname={router.pathname} key={l.title} href={l.href} title={l.title} icon={l.icon} />
                        ))}
                    </div>
                </NavbarItem>
            </NavbarMenu>


        </Navbar>
    );
};

export default NavAdmin;
