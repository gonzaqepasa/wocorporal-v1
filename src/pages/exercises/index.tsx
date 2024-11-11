// pages/index.tsx
import ExerciseList from "@/components/AddExercises/ExercisesList";
import NavBarExercises from "@/components/Navs/NavExercises";
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

interface ExerciseListPageProps {
  exercises: Exercise[];
  error: string | null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Reemplaza 'YOUR_API_ENDPOINT' con tu URL de API para obtener los ejercicios.
    const response = await fetch(`http:localhost:3000/api/exercises`);

    if (!response.ok) {
      throw new Error("Error al cargar los ejercicios");
    }

    const exercises = await response.json();

    return {
      props: { exercises, error: null },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      props: { exercises: [], error: error.message || "Hubo un problema al cargar los ejercicios" },
    };
  }
};

const ExerciseListPage: React.FC<ExerciseListPageProps> = ({ exercises, error }) => {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center">
        <NavBarExercises />
        <h1 className="text-3xl font-bold my-8">Lista de Ejercicios</h1>
        <ExerciseList exercises={exercises} error={error} />
      </main>
    </>
  );
};

export default ExerciseListPage;
