import { useAuth } from "@/pages/_AuthProvider";
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
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
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Panel de Administración</h1>
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3 shadow-lg items-center">
                    <Image
                        alt="Admin Profile"
                        className="object-cover rounded-full"
                        height={80}
                        width={80}
                        src={user?.image}
                    />
                    <div>
                        <h2 className="font-semibold">Información del Administrador</h2>
                        <p className="text-sm"><strong>Nombre:</strong> {data?.profile.name}</p>
                        <p className="text-sm"><strong>Email:</strong> {data?.profile.email}</p>
                        <p className="text-sm"><strong >Rol:</strong> {data?.profile.role.toUpperCase()}</p>
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
                </CardBody>
                <Divider />
                <CardFooter></CardFooter>
            </Card>
        </div>
    );
}
