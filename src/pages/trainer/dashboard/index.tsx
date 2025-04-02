import PanelTrainerMain from "@/components/dashboard/trainer/PanelTrainerMain";
import NavMain from "@/components/Globals/Navs/NavMain";
import ProtectedRoute from "@/pages/_ProtectedRoute";

const TrainerPage = () => {





    return (<>
        <main className={`min-h-screen flex flex-col items-center`}>
            <NavMain/>
            <ProtectedRoute allowedRoles={["trainer", "admin"]}>
                <PanelTrainerMain />
            </ProtectedRoute>
        </main>
    </>);
}

export default TrainerPage;