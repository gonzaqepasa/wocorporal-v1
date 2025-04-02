import PanelMainAdmin from "@/components/dashboard/admin/PanelMainAdmin";
import NavAdmin from "@/components/Globals/Navs/NavMain";
import ProtectedRoute from "@/pages/_ProtectedRoute";

const AdminDashboardPage = () => {
    return (<>
        <ProtectedRoute allowedRoles={['admin']}>
            <NavAdmin />
            <main className="min-h-screen flex flex-col items-center">
                <PanelMainAdmin />
            </main>
        </ProtectedRoute>
    </>);
}

export default AdminDashboardPage;