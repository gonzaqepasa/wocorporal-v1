// pages/index.tsx
import RoutinesList from "@/components/Routine/RoutinesList";
import { url } from "@/config/env_d";
import ProtectedRoute from "@/pages/_ProtectedRoute";
import { GetServerSideProps } from "next";



interface RoutinesListPageProps {
    routines: [];
    error: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { apiKey } = query;
    try {
        const response = await fetch(`${url}/routine/getAll?apiKey=${apiKey}`,);
        if (!response.ok) {
            throw new Error('Error al cargar los ejercicios');
        }
        const sets = await response.json();




        return {
            props: { routines: sets, error: null },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        return {
            props: { exercises: [], error: error.message || 'Hubo un problema al cargar los ejercicios' },
        };
    }
};

const SetsListPage: React.FC<RoutinesListPageProps> = ({ routines, error }) => {
    console.log(routines)
    return (
        <>
            <ProtectedRoute allowedRoles={['admin', 'trainer']}>
                <main className="min-h-screen flex flex-col items-center">
                    <h1 className="text-3xl font-bold my-8">Panel de rutinas</h1>
                    <RoutinesList error={error} routines={routines}/>
               </main>
            </ProtectedRoute>
        </>
    );
};

export default SetsListPage;
