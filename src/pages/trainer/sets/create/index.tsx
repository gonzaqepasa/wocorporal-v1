// pages/index.tsx
import NavbarMain from "@/components/Globals/Navs/NavMain";
import CreateSet from "@/components/Sets/create/CreateSetForm";
import ProtectedRoute from "@/pages/_ProtectedRoute";





const CreateSetPage = () => {
    return (
        <>
            <ProtectedRoute allowedRoles={['admin', 'trainer']}>

                <main className="min-h-screen flex flex-col items-center">
                    <NavbarMain />

                    <CreateSet />
                </main >
            </ProtectedRoute>
        </>
    );
};

export default CreateSetPage;
