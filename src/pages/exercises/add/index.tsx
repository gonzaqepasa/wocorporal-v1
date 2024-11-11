import ExerciseForm from "@/components/AddExercises/FormAddExercises";
import NavBarExercises from "@/components/Navs/NavExercises";


const ExercisesAddPage = () => {
    return (<>
        <main className="min-h-screen flex flex-col items-center">
            <NavBarExercises />
            <ExerciseForm onSuccess={() => { }} />
        </main>
    </>);
}

export default ExercisesAddPage;