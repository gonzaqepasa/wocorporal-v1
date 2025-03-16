import MyUserCard from "@/components/Globals/Perfil/MyUserCard";
import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FcAdvance, FcBarChart } from "react-icons/fc";
import TrainerMetricList from "./Metrics/MetricsList";
import Link from "next/link";

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
                    <div className="flex items-center gap-2">
                        <FcBarChart size={20} />
                        <h3 className="text-xl font-bold ">Metricas</h3>
                    </div>
                    <Divider />

                    <TrainerMetricList metrics={data.metrics} />
                </CardBody>

            </Card>
            <Card radius="none" className="gmt-2   justify-center">

                <CardHeader>
                    <div className="flex items-center gap-2">
                        <FcAdvance size={20} />
                        <h3 className="text-xl font-bold ">Acciones</h3>
                    </div>
                </CardHeader>
                <CardBody className=" ">
                    <div className="flex flex-col gap-2 items-start">

                        <Button color="primary" variant="light" className="justify-start">
                            <Link href={`/trainer/sets?apiKey=${user?.apiKey}`} >Panel de Sets</Link>
                        </Button>
                        <Button color="primary" variant="light" className="justify-start">
                            <Link href={`/trainer/rutinas?apiKey=${user?.apiKey}`} >Panel de Rutinas</Link>
                        </Button>
                        <Button color="primary" variant="light" className="justify-start">
                            <Link href={`/trainer/users?apiKey=${user?.apiKey}`} >Panel de usuarios</Link>
                        </Button>
                    </div>
                </CardBody>





            </Card >
            <Card radius="none" className="gmt-3 ">

                <CardHeader>
                </CardHeader>

                <CardBody className="">

                </CardBody>

            </Card>

        </div >

    </>);
}

export default PanelTrainerMain;