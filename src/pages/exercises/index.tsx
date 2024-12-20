// pages/index.tsx
import ExerciseList from "@/components/AddExercises/ExercisesList";
import NavBarExercises from "@/components/Navs/NavExercises";
import { url } from "@/config/env_d";
import { sortExercises } from "@/logic/order/orderlist";

interface Exercise {
  createdAt: Date;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = async ({ query }: any) => {
  const { sort = "name" } = query; // Si no se pasa un parámetro 'sort', usamos "name" por defecto

  try {
    const response = await fetch(`${url}/api/exercises`);
    if (!response.ok) {
      throw new Error('Error al cargar los ejercicios');
    }
    const exercises = await response.json();
    
    // Ordenar los ejercicios según el parámetro de la query
    const sortedExercises = sortExercises(exercises, sort);
   

      return {
          props: { exercises: sortedExercises, error: null },
      };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
      return {
          props: { exercises: [], error: error.message || 'Hubo un problema al cargar los ejercicios' },
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
