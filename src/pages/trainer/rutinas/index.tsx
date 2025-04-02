// pages/index.tsx
import NavMain from "@/components/Globals/Navs/NavMain";
import ErrorPageMain from "@/components/Globals/pages/ErrorPages";
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

        const sets = await response.json();
        if (!response.ok) {
            throw new Error(sets.error);
        }




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
    if (error) return <ErrorPageMain  >
        <p>{error}</p>
    </ErrorPageMain>


    return (
        <>
            <ProtectedRoute allowedRoles={['admin', 'trainer']}>
                <NavMain />
                <main className="min-h-screen flex flex-col items-center">
                    <h1 className="text-3xl font-bold my-8">Panel de rutinas</h1>
                    <RoutinesList error={error} routines={routines} />
                </main>
            </ProtectedRoute>
        </>
    );
};

export default SetsListPage;
