
import TextKeyValue from "@/components/Globals/text/TextKeyValue";
import { FaUser } from "react-icons/fa";
import { FcKindle, FcSportsMode, FcWorkflow } from "react-icons/fc";

interface Props {
    metrics: {
        totalRoutines: number;
        totalSets: number;
        totalUsers: number;
        totalExercises: number;
    }
}
const TrainerMetricList: React.FC<Props> = ({ metrics }) => {
    return (<>

        <div className="flex flex-col items-start gap-1">
            <TextKeyValue icon={<FcKindle />} text="Rutinas totales" value={metrics.totalRoutines.toString()} />
            <TextKeyValue icon={<FcWorkflow />} text="Sets totales" value={metrics.totalSets.toString()} />
            <TextKeyValue icon={<FaUser className="text-primary-300" />} text="Usuarios totales" value={metrics.totalUsers.toString()} />
            <TextKeyValue icon={<FcSportsMode />} text="Ejercicios totales" value={metrics.totalExercises.toString()} />
        </div>
    </>);
}

export default TrainerMetricList;