import { FormEvent, useState } from "react";
import { Input, Button, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/router";
import { TypesSet } from "@/types/sets";

const CreateSet: React.FC = () => {
    const [setName, setSetName] = useState("");
    const [type, setType] = useState("");
    const [rounds, setRounds] = useState(1);
    const router = useRouter()

    const handleCreateSet = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!setName || !type || rounds <= 0) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }
        try {
            const response = await fetch("/api/sets/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: setName.trim(),
                    type,
                    rounds,
                }),
            });
            if (!response.ok) {
                throw new Error("Error al crear el set");
            }
            const res: TypesSet = await response.json()
            router.push(`/sets/edit/${res._id}`)

            setSetName("");
            setType("");
            setRounds(1);
        } catch (error) {
            console.error(error);
            alert("Error al crear el set");
        }
    };

    return (
        <form className="w-screen max-w-lg" onSubmit={(e) => handleCreateSet(e)}>
            <Card className=" w-full shadow-lg dark">
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
                    <Input
                        required
                        label="Tipo de set"
                        placeholder="Ingrese una tipo..."
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        variant="faded"
                        color="primary"
                    />
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
