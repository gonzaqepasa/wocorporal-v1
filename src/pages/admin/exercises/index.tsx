// pages/index.tsx
import ExerciseListAdmin from "@/components/AddExercises/ExercisesListAdmin";
import NavMain from "@/components/Globals/Navs/NavMain";
import { url } from "@/config/env_d";
import { sortExercises } from "@/logic/order/orderlist";
import ProtectedRoute from "@/pages/_ProtectedRoute";
import { TypesExercise } from "@/types/exercises";


interface ExerciseListPageProps {
  exercises: TypesExercise[];
  error: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = async ({ query }: any) => {
  const { sort = "name" } = query; // Si no se pasa un parámetro 'sort', usamos "name" por defecto
  try {
    const response = await fetch(`${url}/exercise/get-to-admin-list`);
    console.log("ESTA ES LA FCKING RESPUESTA", response);
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
    console.log(error);
    return {
      props: { exercises: [], error: error.message || 'Hubo un problema al cargar los ejercicios' },
    };
  }
};

const ExerciseListPage: React.FC<ExerciseListPageProps> = ({ exercises, error }) => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin"]}>
        <NavMain />
        <main className="min-h-screen flex flex-col items-center background-admin">
          <h1 className="text-3xl font-bold my-8">Lista de Ejercicios</h1>
          <ExerciseListAdmin exercises={exercises} error={error} />
        </main>
      </ProtectedRoute>
    </>
  );
};

export default ExerciseListPage;
