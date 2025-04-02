import { TypesUser } from '@/types/user';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, User } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MyUserCard from '../../Perfil/MyUserCard';
import NavLinks from './Links/NavLinks';
import { SiTrainerroad } from 'react-icons/si';
import { RiAdminFill } from 'react-icons/ri';

interface Props {
    user: TypesUser
    isAuthenticated: boolean
    logout: () => void
}

const NavAdmin: React.FC<Props> = ({ user, isAuthenticated }) => {
    const router = useRouter()


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
                            <NavLinks href='/admin/dashboard' title='Panel de Admin' icon={<RiAdminFill size={20} />} />
                        </DropdownItem>
                        <DropdownItem>
                            <NavLinks href='/trainer/dashboard' title='Panel de Entrenador' icon={<SiTrainerroad size={23} />} />
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
                    </Link> : <Link href={`${user?.role}/dashboard`}>
                        <User

                            avatarProps={{
                                src: user?.image
                            }} name={user?.name} description={user?.email} />
                    </Link>
                    }
                </NavbarItem>
            </NavbarContent>


         



            <NavbarMenu className=''>
                <NavbarItem>
                    <MyUserCard config={{ imgSize: 60 }} />
                </NavbarItem>
                <NavbarItem>
                    <div className='flex flex-col gap-2 my-2'>
                        <NavLinks href='/admin/dashboard' title='Panel de Admin' icon={<RiAdminFill size={20} />} />
                        <NavLinks href='/trainer/dashboard' title='Panel de Entrenador' icon={<SiTrainerroad size={23} />} />
                    </div>
                </NavbarItem>
            </NavbarMenu>
        </Navbar>
    );
};

export default NavAdmin;
