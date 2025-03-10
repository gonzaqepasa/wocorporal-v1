import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { TypesExercise } from "@/types/exercises";
import { TypesSet } from "@/types/sets";
import { showErrorAlert } from "@/utils/SweetAlertUtils";
import { Button } from "@nextui-org/react";
// import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
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
    // const router = useRouter()
    const handleRemoveExercise = async (exerciseId: string) => {
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

            // Redirigir o mostrar un mensaje de éxito
            onRemoveExercise(prev => prev.filter(e => e.exercise._id !== exerciseId))
            // showSuccessAlert({ title: "Ejercicio eliminado del set", text: "" })
            // router.reload()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            showErrorAlert(error.message)
        }
    };


    return (<> <Button variant="light" color="danger" className={`min-w-0`} onPress={() => handleRemoveExercise(exerciseId)}>
        <FaDeleteLeft />
    </Button></>);
}

export default RemoveExerciseModal;