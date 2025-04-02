import NavMain from "@/components/Globals/Navs/NavMain";
import FormCreateRoutine from "@/components/Routine/Create/FormCreateRoutine";
import ProtectedRoute from "@/pages/_ProtectedRoute";


const CreateRoutinePage = () => {
    return (<>
        <ProtectedRoute allowedRoles={["admin", "trainer"]}>
            <main className="min-h-screen flex flex-col items-center" >
                <NavMain />
                <FormCreateRoutine />
            </main>
        </ProtectedRoute>
    </>);
}

export default CreateRoutinePage;