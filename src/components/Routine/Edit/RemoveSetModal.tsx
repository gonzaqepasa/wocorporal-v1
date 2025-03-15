import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { TypesRoutine } from "@/types/routine";
import { TypesSet } from "@/types/sets";
import { showErrorAlert, showSuccessAlert } from "@/utils/SweetAlertUtils";
import { Button } from "@nextui-org/react";
// import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

interface Props {
    rutina: TypesRoutine
    setId: string
    onRemoveSet: Dispatch<SetStateAction<TypesSet[]>>
}

const RemoveSetModal: React.FC<Props> = ({ rutina, setId, onRemoveSet }) => {
    const { user } = useAuth()
    const [load, setLoad] = useState<boolean>(false);
    // const router = useRouter()
    const handleRemoveExercise = async (setId: string) => {
        setLoad(true)
        try {
            const response = await fetch(`${url}/routine/remove-set/${rutina._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                    , Authorization: `Bearer ${user?.token}`

                },
                body: JSON.stringify({ setId }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Error al actualizar el set");

            }
            const data = await response.json();


            setLoad(false)
            onRemoveSet(data.sets)
            // Redirigir o mostrar un mensaje de éxito
            showSuccessAlert({ title: "Set removido", text: "Se removido el set de la rutina" })
            // router.reload()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoad(false)
            console.error(error);
            showErrorAlert(error.message)
        }
    };


    return (<> <Button variant="light" color="danger" isLoading={load} className={`min-w-0`} onPress={() => handleRemoveExercise(setId)}>
        <FaDeleteLeft />
    </Button></>);
}

export default RemoveSetModal;