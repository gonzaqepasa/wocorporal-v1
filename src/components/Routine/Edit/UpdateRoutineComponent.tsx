import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { showErrorAlert, showSuccessAlert } from "@/utils/SweetAlertUtils";
import { useRouter } from "next/router";
import { TypesRoutine } from "@/types/routine";

interface Props {
    // set: { name: string, description: string, rounds: number ,_id:string }
    rutina: TypesRoutine
    //
    handleSubmit?: () => void
}
const UpdateRoutineComponent: React.FC<Props> = ({ rutina }) => {
    const { user } = useAuth();
    const [ruti, setRuti] = useState(rutina);

    // const [rounds, setRounds] = useState(rutina.rounds);
    const router = useRouter()



    const handleSubmit = async () => {
        try {
            const response = await fetch(`${url}/routine/update/${rutina._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify({ name: ruti.name, description: ruti.description }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Error al actualizar la rutina");

            }
            // Redirigir o mostrar un mensaje de éxito

            showSuccessAlert({ title: "Rutina actualizada", text: "La rutina se actualizo correctamente" })
            router.reload()
            // const rutina: TypesRoutine = await response.json();

            // setRuti(rutina)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            showErrorAlert(error.message)
        }
    };




    return (<>

        <div className="flex flex-wrap gap-2 max-w-md">
            <Button className=" w-min  min-w-0 " variant="light" onClick={handleSubmit} isDisabled={rutina.name === ruti.name && rutina.description === ruti.description} color="primary" fullWidth>
                <BiSave size={22} />
                {/* <p>Guardar</p> */}
            </Button>
            {/* <Input
                color="primary"
                variant="faded"
                className=" w-20"
                label="Rondas"
                type="number"
                value={`${rounds}`}
                onChange={(e) => setRounds(Number(e.target.value))}
                fullWidth
            /> */}
            <Input
                color="primary"
                variant="faded"
                className=" w-64"
                label="Nombre de la rutina"
                value={ruti.name}
                onChange={(e) => setRuti({ ...ruti, name: e.target.value })}
                fullWidth
            />
            <Textarea
                color="primary"
                variant="faded"
                label="Descripción"
                value={ruti.description}
                onChange={(e) => setRuti({ ...ruti, description: e.target.value })}
                fullWidth
            />

        </div>

    </>);
}

export default UpdateRoutineComponent;