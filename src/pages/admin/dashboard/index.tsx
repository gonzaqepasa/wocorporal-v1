import PanelMainAdmin from "@/components/dashboard/admin/PanelMainAdmin";
import NavAdmin from "@/components/Navs/NavAdmin";

const AdminDashboardPage = () => {
    return (<>
        <NavAdmin />
        <main className="min-h-screen flex flex-col items-center">
            <PanelMainAdmin />
        </main>
    </>);
}

export default AdminDashboardPage;