// components/NavBar.tsx
import { useAuth } from '@/pages/_AuthProvider';
import NavAdmin from './Navs/NavAdmin';
import NavTrainer from './Navs/NavTrainer';



const NavMain: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth()

    if (!user) return <div>Cargando...</div>;

    switch (user.role) {
        case "admin":
            return <NavAdmin user={user} logout={logout} isAuthenticated={isAuthenticated} />;
        case "trainer":
        return <NavTrainer user={user} logout={logout} isAuthenticated={isAuthenticated} />;
        case "user":
        // return <NavUser user={user} logout={logout} />;
        default:
            return null;
    }

};

export default NavMain;
