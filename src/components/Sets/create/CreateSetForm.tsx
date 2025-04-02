import { FormEvent, useState } from "react";
import { Input, Button, Card, CardHeader, CardBody, CardFooter, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/router";
import { TypesSet } from "@/types/sets";
import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { capitalizeWords } from "@/utils/TextUtils";
import { showErrorAlert } from "@/utils/SweetAlertUtils";

const CreateSet: React.FC = () => {
    const [setName, setSetName] = useState("");
    const [type, setType] = useState("");
    const [rounds, setRounds] = useState(1);
    const [workTime, setWorkTime] = useState(0);
    const [restTime, setRestTime] = useState(0);

    const router = useRouter()
    const { user } = useAuth()

    const avaliableTypes = ['amrap', 'tabata', 'vueltas', 'cluster', 'dropset', 'emom']

    const handleCreateSet = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!setName || !type || rounds <= 0) {
            throw new Error("Todos los campos son requeridos");
        }
        try {
            const response = await fetch(`${url}/set/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    name: setName.trim(),
                    type,
                    rounds,
                    workTime,
                    restTime
                }),
            }); if (!response.ok) {
                const error = await response.json()
                throw new Error(await error.error);
            }
            const res: TypesSet = await response.json()
            router.push(`/sets/edit/${res._id}`)

            setSetName("");
            setType("");
            setRounds(1);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            showErrorAlert(error.message);
        }
    };

    return (
        <form className="w-screen max-w-lg" onSubmit={(e) => handleCreateSet(e)}>
            <Card className=" w-full shadow-lg ">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-center">Crear Nuevo Set</h2>
                </CardHeader>
                <CardBody className="flex flex-row flex-wrap gap-4">
                    <Input
                        required
                        label="Rounds"
                        type="number"
                        min={1}
                        value={rounds.toString()}
                        onChange={(e) => setRounds(Number(e.target.value))}
                        variant="faded"
                        className={`w-20`}
                        color="primary"
                    />
                    <Input
                        required
                        label="Nombre del Set"
                        placeholder="Ingrese un nombre.."
                        value={setName}
                        onChange={(e) => setSetName(e.target.value)}
                        variant="faded"
                        className="w-fit"
                        color="primary"
                    />


                    <Select
                        required
                        label="Tipo de set"
                        placeholder="Ingrese una tipo..."
                        variant="faded"
                        color="primary"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        {avaliableTypes.map((avaliableType) => (
                            <SelectItem key={avaliableType} value={avaliableType}>{capitalizeWords(avaliableType)}</SelectItem>
                        ))}
                    </Select>
                    <div className="flex flex-row gap-4 items-stretch">
                        <Input
                            required
                            label="Tiempo de trabajo"
                            type="number"
                            min={1}
                            value={workTime.toString()}
                            onChange={(e) => setWorkTime(Number(e.target.value))}
                            variant="faded"
                            // className={`w-20`}
                            color="primary"
                            isDisabled={type === 'vueltas' || type === 'dropset' || type === 'emom'}

                        />
                        <Input
                            required
                            label="Tiempo de descanso"
                            type="number"
                            min={1}
                            value={restTime.toString()}
                            onChange={(e) => setRestTime(Number(e.target.value))}
                            variant="faded"
                            // className={`w-20`}
                            color="primary"
                            isDisabled={type === 'vueltas' || type === 'dropset' || type === 'emom'}
                        />

                    </div>
                </CardBody>
                <CardFooter className="flex justify-end gap-2">
                    <Button color="danger" onClick={() => {
                        setSetName("");
                        setType("");
                        setRounds(1);
                    }}>
                        Limpiar
                    </Button>
                    <Button color="primary" type="submit" >
                        Crear Set
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default CreateSet;
