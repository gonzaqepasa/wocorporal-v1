import PanelTrainerMain from "@/components/dashboard/trainer/PanelTrainerMain";
import NavMain from "@/components/Globals/Navs/NavMain";
import ProtectedRoute from "@/pages/_ProtectedRoute";

const TrainerPage = () => {





    return (<>
        <ProtectedRoute allowedRoles={["trainer", "admin"]}>
            <NavMain />
            <main className={`min-h-screen flex flex-col items-center`}>
                <PanelTrainerMain />
            </main>
        </ProtectedRoute>
    </>);
}

export default TrainerPage;