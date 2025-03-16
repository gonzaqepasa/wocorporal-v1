// pages/index.tsx
import UsersList from "@/components/Users/UserList";
import { url } from "@/config/env_d";
import ProtectedRoute from "@/pages/_ProtectedRoute";
import { TypesUser } from "@/types/user";
import { GetServerSideProps } from "next";



interface SetsListPageProps {
    users: TypesUser[];
    error: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { apiKey } = context.query
    try {
        const response = await fetch(`${url}/user/getAllUsers?apiKey=${apiKey}`);
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || 'Error al cargar los ejercicios');
        }
        ;




        return {
            props: { users: data, error: null },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        return {
            props: { users: [], error: error.error || 'Hubo un problema al cargar los ejercicios' },
        };
    }
};

const SetsListPage: React.FC<SetsListPageProps> = ({ users, error }) => {
    console.log(users, error)


    if (error) return <>
        <ProtectedRoute allowedRoles={["admin", "trainer"]}>
            <main className="min-h-screen flex flex-col items-center">
                <p>{error}</p>
            </main>
        </ProtectedRoute>
    </>

    return (
        <>
            <ProtectedRoute allowedRoles={['admin', 'trainer']}>
                <main className="min-h-screen flex flex-col items-center">
                    <h1 className="text-3xl font-bold my-8">Lista de Usuarios</h1>
                    <UsersList users={users} />
                </main>
            </ProtectedRoute>
        </>
    );
};

export default SetsListPage;
