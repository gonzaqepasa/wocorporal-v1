import PanelTrainerMain from "@/components/dashboard/trainer/PanelTrainerMain";
import ProtectedRoute from "@/pages/_ProtectedRoute";

const TrainerPage = () => {





    return (<>
        <main className={`min-h-screen flex flex-col items-center`}>
            <ProtectedRoute allowedRoles={["trainer", "admin"]}>
                <PanelTrainerMain />
            </ProtectedRoute>
        </main>
    </>);
}

export default TrainerPage;