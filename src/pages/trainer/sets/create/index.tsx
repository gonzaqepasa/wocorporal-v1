// pages/index.tsx
import NavBarExercises from "@/components/Navs/NavAdmin";
import CreateSet from "@/components/Sets/create/CreateSetForm";
import ProtectedRoute from "@/pages/_ProtectedRoute";





const CreateSetPage = () => {
    return (
        <>
            <ProtectedRoute allowedRoles={['admin', 'trainer']}>

                <main className="min-h-screen flex flex-col items-center">
                    <NavBarExercises />

                    <CreateSet />
                </main >
            </ProtectedRoute>
        </>
    );
};

export default CreateSetPage;
