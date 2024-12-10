// pages/index.tsx
import NavBarExercises from "@/components/Navs/NavExercises";
import CreateSet from "@/components/Sets/create/CreateSetForm";





const CreateSetPage = () => {
    return (
        <>
            <main className="min-h-screen flex flex-col items-center">
                <NavBarExercises />

                <CreateSet />
            </main>
        </>
    );
};

export default CreateSetPage;
