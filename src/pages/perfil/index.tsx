import LoadingMain from "@/components/Globals/loading/LoadingMain";
import ProtectedRoute from "../_ProtectedRoute";

const PerfilPage = () => {
    return (<>
        <ProtectedRoute allowedRoles={["user", "trainer", "admin"]}>
            <main className="min-h-screen flex flex-col items-center " >
                <p>Perfil</p>
                <LoadingMain/>
            </main>
        </ProtectedRoute>
    </>);
}

export default PerfilPage;