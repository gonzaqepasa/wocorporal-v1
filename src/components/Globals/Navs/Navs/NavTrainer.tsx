import { TypesUser } from '@/types/user';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, User } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MyUserCard from '../../Perfil/MyUserCard';
import NavLinks from './Links/NavLinks';
import { SiTrainerroad } from 'react-icons/si';
import { FaClipboardList, FaDumbbell, FaPlusCircle, FaUserFriends } from 'react-icons/fa';

interface Props {
    user: TypesUser
    isAuthenticated: boolean
    logout: () => void
}










const NavTrainer: React.FC<Props> = ({ user }) => {
    const router = useRouter()
    const enlaces = {
        dashboards: [
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
                <Dropdown className='dark flex flex-col gap-2 my-2 w-72 '>
                    <DropdownTrigger>
                        <Button variant="light" color='default' className='dark'>
                            <User
                                avatarProps={{
                                    src: user?.image
                                }} name={user?.name} description={user?.email} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">




                        <DropdownSection>
                            {enlaces.dashboards.map((l) => (
                                <DropdownItem key={l.title} className='dark'>
                                    <NavLinks pathname={router.pathname} href={l.href} title={l.title} icon={l.icon} />
                                </DropdownItem>
                            ))}
                        </DropdownSection>
                        <DropdownSection title={"Usuarios"} className='pl-3'>
                            {enlaces.users.map((l) => (
                                <DropdownItem key={l.title} className='dark'>
                                    <NavLinks pathname={router.pathname} href={l.href} title={l.title} icon={l.icon} />
                                </DropdownItem>
                            ))}
                        </DropdownSection>
                        <DropdownSection title={"Rutinas"} className='pl-3'>
                            {enlaces.routines.map((l) => (
                                <DropdownItem key={l.title} className='dark'>
                                    <NavLinks pathname={router.pathname} href={l.href} title={l.title} icon={l.icon} />
                                </DropdownItem>
                            ))}
                        </DropdownSection>
                        <DropdownSection title={"Sets"} className='pl-3'>
                            {enlaces.sets.map((l) => (
                                <DropdownItem key={l.title} className='dark'>
                                    <NavLinks pathname={router.pathname} href={l.href} title={l.title} icon={l.icon} />
                                </DropdownItem>
                            ))}
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>











            <NavbarMenu className='bg-black/90 dark'>
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
                        <span className="font-bold text-primary-200 text-sm">Usuarios</span>
                        {enlaces.users.map((l) => (
                            <NavLinks pathname={router.pathname} key={l.title} href={l.href} title={l.title} icon={l.icon} />
                        ))}
                    </div>
                </NavbarItem>

                <NavbarItem>
                    <div className="flex flex-col gap-2 my-2">
                        <span className="font-bold text-sm text-primary-200">Rutinas</span>
                        {enlaces.routines.map((l) => (
                            <NavLinks pathname={router.pathname} key={l.title} href={l.href} title={l.title} icon={l.icon} />
                        ))}
                    </div>
                </NavbarItem>

                <NavbarItem>
                    <div className="flex flex-col gap-2 my-2">
                        <span className="font-bold text-sm text-primary-200">Sets</span>
                        {enlaces.sets.map((l) => (
                            <NavLinks pathname={router.pathname} key={l.title} href={l.href} title={l.title} icon={l.icon} />
                        ))}
                    </div>
                </NavbarItem>


            </NavbarMenu>
        </Navbar>
    );
};

export default NavTrainer;
