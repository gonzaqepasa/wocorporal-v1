import MyUserCard from "@/components/Globals/Perfil/MyUserCard";
import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FcBarChart } from "react-icons/fc";
import TrainerMetricList from "./Metrics/MetricsList";

interface typesTrainingDashboard {
    profile: {
        name: string;
        email: string;
        role: string;
        image: string
    };
    metrics: {
        totalRoutines: number;
        totalSets: number;
        totalUsers: number;
        totalExercises: number;
    };
}


const PanelTrainerMain = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<typesTrainingDashboard>();




    useEffect(() => {
        // if (!data) return;
        fetch(`${url}/user/trainer/dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log("esto es data", data)
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [user]);







    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (data) return (<>

        <div className="grid-main-trainerpanel w-full min-h-[650px]">
            <Card radius="none" className="gmt-1">
                <CardHeader>
                    <MyUserCard config={{ display: "vertical", radius: "full", nameSize: "text-2xl" }} />

                </CardHeader>
                <CardBody>

                </CardBody>

            </Card>
            <Card radius="none" className="gmt-2   justify-center">

                <CardHeader>
                    <div className="flex items-center gap-2">
                        <FcBarChart size={20} />
                        <h3 className="text-xl font-bold ">Metricas</h3>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="">
                    <TrainerMetricList metrics={data.metrics} />
                </CardBody>





            </Card >
            <div className="gmt-3 bg-blue-600">3</div>

        </div >

    </>);
}

export default PanelTrainerMain;