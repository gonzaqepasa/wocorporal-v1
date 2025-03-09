import { useEffect, useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, useDisclosure, ModalContent, Input, ModalFooter } from "@nextui-org/react";
import { GrAdd } from "react-icons/gr";
import { showErrorAlert, showSuccessAlert } from "@/utils/SweetAlertUtils";
import { useRouter } from "next/router";
import { url } from "@/config/env_d";
import CustomSelect from "@/components/Globals/select/CustomSelect";
import { useAuth } from "@/pages/_AuthProvider";




interface Params {
    setId: string

}

const AddExerciseToSetModal: React.FC<Params> = ({ setId }) => {
    const { user } = useAuth()
    const [load, setLoad] = useState<boolean>(true);
    const [exercises, setExercises] = useState<{ name: string, id: string }[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<{ id: string, name: string }>();
    const [configExercise, setConfigExercise] = useState({
        reps: 0,
        rest: 0,
        duration: 0
    });

    const router = useRouter()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // Cargar ejercicios desde la base de datos
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(`${url}/exercise/get/namelist`);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || "Error al cargar los ejercicios");
                }
                const data = await response.json();
                console.log(data)
                setExercises(data);
                setLoad(false)
            } catch (error) {
                setLoad(false)
                console.error(error);
            }
        };

        if (isOpen) {
            fetchExercises();
        }
    }, [isOpen]);

    const handleSelectExercise = (exerciseId: Set<never>) => {
        // const exercise = exercises.find((exercise) => exercise.id === String(exerciseId));
        const exercise = exercises.find((exercise) => exercise.id === Array.from(exerciseId)[0]);
        // console.log(exercise);
        setSelectedExercise(exercise);
    }
    // Cambia la configuracion
    // Manejar los cambios en la configuración del ejercicio
    const handleConfigChange = (field: string, value: number) => {
        setConfigExercise((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Manejar la acción de agregar el ejercicio al set
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAddExercise = async ({ exerciseId, reps, duration, rest }: { exerciseId: string, reps: number, duration: number, rest: number }) => {
        if (selectedExercise) {
            try {
                const response = await fetch(`${url}/sets/add-exercise/${setId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                        , Authorization: `Bearer ${user?.token}`
                    },
                    body: JSON.stringify({ exerciseId, reps, duration, rest }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.log(error.message);
                    throw new Error(error.message || "Error al agregar el ejercicio al set");
                }


                showSuccessAlert({ title: "Ejercicio agregado", text: "El ejercicio se agregó correctamente" })
                router.reload()
            } catch (error) {
                console.error(error);
                showErrorAlert("Error al actualizar el set")
            }

        }
    };

    return (
        <>
            <Button onPress={onOpen} variant="light" color="primary">Agregar ejercicio al set</Button>
            <Modal isOpen={isOpen} className="" onOpenChange={onOpenChange}>
                <ModalContent>
                    {onClose => (
                        <>

                            <ModalHeader className="flex flex-col p-2 bg-primary-300 gap-1">
                                <h3 id="modal-title" className="flex items-center gap-1 text-base text-neutral-200" >
                                    <GrAdd className="text-primary-700" />
                                    Agregar Ejercicio al Set                                </h3>

                            </ModalHeader>
                            <ModalBody>
                                <span className=" flex flex-col gap-1">
                                    {selectedExercise && <p className="text-lg text-neutral-200">{selectedExercise.name}</p>}
                                    {/* {selectedExercise && <Difficulty size={12} difficulty={selectedExercise.difficulty} />} */}
                                    {/* {selectedExercise && <p className="text-xs text-neutral-400 font-light">{formatUpdatedAt(selectedExercise.updatedAt)}</p>} */}
                                </span>
                                <form className="flex gap-4">
                                    <Input
                                        required
                                        variant="faded"
                                        color="primary"
                                        label="Repeticiones"
                                        min={0}
                                        max={400}
                                        type="number"
                                        value={configExercise.reps.toString()}
                                        onChange={(e) => handleConfigChange("reps", Number(e.target.value))}
                                    />
                                    <Input
                                        required
                                        variant="faded"
                                        color="primary"
                                        label="Duración (s)"
                                        min={0}
                                        max={600}
                                        type="number"
                                        value={configExercise.duration.toString()}
                                        onChange={(e) => handleConfigChange("duration", Number(e.target.value))}
                                    />
                                    <Input
                                        required
                                        variant="faded"
                                        color="primary"
                                        label="Descanso (s)"
                                        min={0}
                                        max={600}
                                        type="number"
                                        value={configExercise.rest.toString()}
                                        onChange={(e) => handleConfigChange("rest", Number(e.target.value))}
                                    />
                                </form>
                                {load ? <p>Cargando...</p> :
                                    <>
                                        <CustomSelect exercises={exercises} onChangeExercise={handleSelectExercise} />
                                    </>

                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button isDisabled={!selectedExercise?.id || !configExercise.reps && !configExercise.duration} onClick={() => handleAddExercise({ exerciseId: String(selectedExercise?.id), duration: configExercise.duration, reps: configExercise.reps, rest: configExercise.rest })} color="primary" disabled={!selectedExercise}>
                                    Agregar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
};

export default AddExerciseToSetModal;





