import ExerciseForm from "@/components/AddExercises/FormAddExercises";

const ExercisesAddPage = () => {
    return (<>
        <main className="min-h-screen flex flex-col items-center">
            <ExerciseForm onSuccess={() => { }} />
        </main>
    </>);
}

export default ExercisesAddPage;