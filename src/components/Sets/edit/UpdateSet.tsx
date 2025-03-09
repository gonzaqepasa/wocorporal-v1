import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { showErrorAlert, showSuccessAlert } from "@/utils/SweetAlertUtils";
import { useRouter } from "next/router";

interface Props {
    set: { name: string, description: string, rounds: number ,_id:string }
    handleSubmit?: () => void
}
const UpdateSetComponent: React.FC<Props> = ({ set }) => {
    const { user } = useAuth();
    const [name, setName] = useState(set.name);
    const [description, setDescription] = useState(set.description || "");
    const [rounds, setRounds] = useState(set.rounds);
    const router = useRouter()



    const handleSubmit = async () => {
        try {
            const response = await fetch(`${url}/set/update/${set._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify({ name, description, rounds }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Error al actualizar el set");

            }
            // Redirigir o mostrar un mensaje de éxito
            alert("Set actualizado correctamente");
            showSuccessAlert({ title: "Set actualizado", text: "El set se actualizo correctamente" })
            router.reload()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            showErrorAlert(error.message)
        }
    };




    return (<>

        <div className="flex flex-wrap gap-2 max-w-md">
            <Button className=" w-min  min-w-0 " variant="light" onClick={handleSubmit} isDisabled={set.name === name && set.description === description && set.rounds === rounds} color="primary" fullWidth>
                <BiSave size={22} />
                {/* <p>Guardar</p> */}
            </Button>
            <Input
                color="primary"
                variant="faded"
                className=" w-20"
                label="Rondas"
                type="number"
                value={`${rounds}`}
                onChange={(e) => setRounds(Number(e.target.value))}
                fullWidth
            />
            <Input
                color="primary"
                variant="faded"
                className=" w-64"
                label="Nombre del Set"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
            <Textarea
                color="primary"
                variant="faded"
                label="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
            />

        </div>

    </>);
}

export default UpdateSetComponent;