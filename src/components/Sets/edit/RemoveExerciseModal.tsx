import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { TypesExercise } from "@/types/exercises";
import { TypesSet } from "@/types/sets";
import { showErrorAlert } from "@/utils/SweetAlertUtils";
import { Button } from "@nextui-org/react";
// import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

interface Props {
    set: TypesSet
    , exerciseId: string
    onRemoveExercise: Dispatch<SetStateAction<{
        exercise: TypesExercise;
        reps: number;
        duration: number;
        description: string;
    }[]>>
}

const RemoveExerciseModal: React.FC<Props> = ({ set, exerciseId, onRemoveExercise }) => {
    const { user } = useAuth()
    const [load, setLoad] = useState<boolean>(false);
    // const router = useRouter()
    const handleRemoveExercise = async (exerciseId: string) => {
        setLoad(true)
        try {
            const response = await fetch(`${url}/set/remove-exercise/${set._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                    , Authorization: `Bearer ${user?.token}`
                    
                },
                body: JSON.stringify({ exerciseId }),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Error al actualizar el set");
                
            }
            setLoad(false)
            const data = await response.json();
            
            onRemoveExercise(data.exercises)
            
            // Redirigir o mostrar un mensaje de éxito
            // showSuccessAlert({ title: "Ejercicio eliminado del set", text: "" })
            // router.reload()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoad(false)
            console.error(error);
            showErrorAlert(error.message)
        }
    };


    return (<> <Button variant="light" color="danger" isLoading={load} className={`min-w-0`} onPress={() => handleRemoveExercise(exerciseId)}>
        <FaDeleteLeft />
    </Button></>);
}

export default RemoveExerciseModal;