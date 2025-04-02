import EditExercise from "@/components/AddExercises/EditExercise";
import NavMain from "@/components/Globals/Navs/NavMain";
import ErrorPageMain from "@/components/Globals/pages/ErrorPages";
import { url } from "@/config/env_d";
import ProtectedRoute from "@/pages/_ProtectedRoute";
import { GetServerSideProps } from "next";
interface Exercise {
    _id: string;
    name: string;
    description: string;
    muscles: string;
    equipment: string;
    difficulty: number;
    videoUrl: string;
}

interface PageProps {
    exercise: Exercise | null;
    error: string | null;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id, apiKey } = context.query;
    // console.log("ESTE ES EL ID", id);
    try {
        const response = await fetch(`${url}/exercise/${id}?apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error("Error al cargar el ejercicio");
        }
        const exercise = await response.json();
        console.log("ESTE ES EL EJERCICIO", exercise);
        return {
            props: { exercise, error: null },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return {
            props: { exercise: null, error: err.message || "Hubo un problema al cargar el ejercicio" },
        };
    }
};
const ExercisesEditPage: React.FC<PageProps> = ({ exercise, error }) => {


    if (error || exercise === null) {
        return <ErrorPageMain>
            <p className="text-center text-red-500">{error}</p>;
        </ErrorPageMain>
    }




    return (<>
        <ProtectedRoute allowedRoles={['admin', 'trainer']}>
            <NavMain />
            <main className="min-h-screen flex flex-col items-center">
                <EditExercise exercise={exercise} />
            </main>
        </ProtectedRoute>
    </>);
}

export default ExercisesEditPage;