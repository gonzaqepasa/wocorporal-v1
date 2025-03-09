// pages/index.tsx
import SetsList from "@/components/Sets/SetsList";
import { url } from "@/config/env_d";
import ProtectedRoute from "@/pages/_ProtectedRoute";



interface SetsListPageProps {
    sets: [];
    error: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = async ({ }: any) => {

    try {
        const response = await fetch(`${url}/set/getAll`);
        if (!response.ok) {
            throw new Error('Error al cargar los ejercicios');
        }
        const sets = await response.json();




        return {
            props: { sets: sets, error: null },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        return {
            props: { exercises: [], error: error.message || 'Hubo un problema al cargar los ejercicios' },
        };
    }
};

const SetsListPage: React.FC<SetsListPageProps> = ({ sets, error }) => {
    return (
        <>
            <ProtectedRoute allowedRoles={['admin', 'trainer']}>
                <main className="min-h-screen flex flex-col items-center">
                    <h1 className="text-3xl font-bold my-8">Lista de Sets</h1>
                    <SetsList error={error} sets={sets} />
                </main>
            </ProtectedRoute>
        </>
    );
};

export default SetsListPage;
