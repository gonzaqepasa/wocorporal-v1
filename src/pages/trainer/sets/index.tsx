// pages/index.tsx
import NavBarExercises from "@/components/Navs/NavExercises";
import SetsList from "@/components/Sets/SetsList";
import { url } from "@/config/env_d";



interface SetsListPageProps {
    sets: [];
    error: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = async ({ }: any) => {

    try {
        const response = await fetch(`${url}/api/sets/get`);
        if (!response.ok) {
            throw new Error('Error al cargar los ejercicios');
        }
        const sets = await response.json();




        return {
            props: { sets: sets, error: null },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            props: { exercises: [], error: error.message || 'Hubo un problema al cargar los ejercicios' },
        };
    }
};

const SetsListPage: React.FC<SetsListPageProps> = ({ sets, error }) => {
    return (
        <>
            <main className="min-h-screen flex flex-col items-center">
                <NavBarExercises />
                <h1 className="text-3xl font-bold my-8">Lista de Sets</h1>
                <SetsList error={error} sets={sets} />
            </main>
        </>
    );
};

export default SetsListPage;
