import { useAuth } from "@/pages/_AuthProvider";
import { Button, Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDumbbell, FaLayerGroup, FaUsers } from "react-icons/fa";

interface AdminStats {
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

export default function PanelMainAdmin() {
    const [data, setData] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        fetch(`http://localhost:3002/api/admin/stats/${user?._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [user]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className=" w-full flex items-center justify-center flex-col gap-4">

            <Card className="max-w-2xl w-full rounded-none">
                <CardHeader className="flex gap-3 shadow-lg items-center">
                    <Image
                        alt="Admin Profile"
                        className="object-cover rounded-full"
                        height={80}
                        width={80}
                        src={user?.image}
                    />
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-lg text-neutral-500">Información del Administrador</h2>
                        <p className="text-sm"><strong className="italic text-neutral-900">Nombre:</strong> {data?.profile.name}</p>
                        <p className="text-sm"><strong className="italic text-neutral-900">Email:</strong> {data?.profile.email}</p>
                        <p className="text-sm"><strong className="italic text-neutral-900" >Rol:</strong> {data?.profile.role.toUpperCase()}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex items-center gap-4 shadow p-2 my-1 rounded-lg ">
                        <FaDumbbell className="text-blue-500 text-xl" />
                        <p className="italic">Rutinas:</p>
                        <p className="font-medium">{data?.metrics.totalRoutines}</p>
                    </div>
                    <div className="flex items-center gap-4 shadow p-2 rounded-lg ">
                        <FaLayerGroup className="text-green-500 text-xl" />
                        <p className="italic">Sets:</p>
                        <p className="font-medium">{data?.metrics.totalSets}</p>
                    </div>
                    <div className="flex items-center gap-4 shadow p-2 rounded-lg ">
                        <FaUsers className="text-red-500 text-xl" />
                        <p className="italic">Usuarios:</p>
                        <p className="font-medium">{data?.metrics.totalUsers}</p>
                    </div>
                    <div className="flex items-center gap-4 shadow p-2 rounded-lg ">
                        <FaDumbbell className="text-yellow-500 text-xl" />
                        <p className="italic">Ejercicios:</p>
                        <p className="font-medium">{data?.metrics.totalExercises}</p>
                        <Button size="sm" variant="light" color="primary">
                            <Link href="/admin/exercises">
                                Ver Ejercicios
                            </Link>
                        </Button>
                    </div>
                </CardBody>
                {/* <Divider />
                <CardFooter></CardFooter> */}
            </Card>
        </div>
    );
}
