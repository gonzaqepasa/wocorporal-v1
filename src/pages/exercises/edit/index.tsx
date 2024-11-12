import EditExercise from "@/components/AddExercises/EditExercise";
import NavBarExercises from "@/components/Navs/NavExercises";
import { url } from "@/config/env_d";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
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
    const { id } = context.query;

    try {
        const response = await fetch(`${url}/api/exercises?id=${id}`);
        if (!response.ok) {
            throw new Error("Error al cargar el ejercicio");
        }
        const exercise = await response.json();

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

    const router = useRouter();

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!exercise) {
        return <p className="text-center text-gray-500">No se encontró el ejercicio.</p>;
    }


    return (<>
        <main className="min-h-screen flex flex-col items-center">
            <NavBarExercises />
            <EditExercise exercise={exercise} onSuccess={() => router.push("/exercises")} />
        </main>
    </>);
}

export default ExercisesEditPage;