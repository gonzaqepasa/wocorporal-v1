import ExerciseForm from "@/components/AddExercises/FormAddExercises";
import NavMain from "@/components/Globals/Navs/NavMain";
import ProtectedRoute from "@/pages/_ProtectedRoute";


const ExercisesAddPage = () => {
    return (<>
        <ProtectedRoute allowedRoles={["admin", "trainer"]}>
            <NavMain />
            <main className="min-h-screen flex flex-col items-center">
                <ExerciseForm onSuccess={() => { }} />
            </main>
        </ProtectedRoute>
    </>);
}

export default ExercisesAddPage;