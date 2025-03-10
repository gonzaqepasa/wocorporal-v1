import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, useDisclosure, ModalContent, Input, ModalFooter } from "@nextui-org/react";
import { GrAdd } from "react-icons/gr";
import { showErrorAlert } from "@/utils/SweetAlertUtils";
import { url } from "@/config/env_d";
import CustomSelect from "@/components/Globals/select/CustomSelect";
import { useAuth } from "@/pages/_AuthProvider";
import { TypesExercise } from "@/types/exercises";




interface Params {
    setId: string
    onAddExercise: Dispatch<SetStateAction<{
        exercise: TypesExercise;
        reps: number;
        duration: number;
        description: string;
    }[]>>
}

const AddExerciseToSetModal: React.FC<Params> = ({ setId, onAddExercise }) => {
    const { user } = useAuth()
    const [load, setLoad] = useState<boolean>(true);
    const [exercises, setExercises] = useState<TypesExercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<TypesExercise>();
    const [configExercise, setConfigExercise] = useState({
        reps: 0,
        description: "",
        duration: 0
    });

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
        const exercise = exercises.find((exercise) => exercise._id === Array.from(exerciseId)[0]);
        // console.log(exercise);
        setSelectedExercise(exercise);


    }
    // Cambia la configuracion
    // Manejar los cambios en la configuración del ejercicio
    const handleConfigChange = (field: string, value: number | string) => {
        setConfigExercise((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Manejar la acción de agregar el ejercicio al set
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAddExercise = async ({ exerciseId, reps, duration, description }: { exerciseId: string, reps: number, duration: number, description: string }) => {
        if (selectedExercise) {
            try {
                const response = await fetch(`${url}/set/add-exercise/${setId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                        , Authorization: `Bearer ${user?.token}`
                    },
                    body: JSON.stringify({ exerciseId, reps, duration, description }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.log(error.message);
                    throw new Error(error.message || "Error al agregar el ejercicio al set");
                }


                // showSuccessAlert({ title: "Ejercicio agregado", text: "El ejercicio se agregó correctamente" })
                onAddExercise(prev => [...prev, { exercise: selectedExercise, reps, duration, description }])
                onOpenChange()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error(error);
                showErrorAlert(error.message)
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
                                        label="Descripcion"
                                        min={0}
                                        max={600}
                                        type="text"
                                        value={configExercise.description.toString()}
                                        onChange={(e) => handleConfigChange("description", String(e.target.value))}
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
                                <Button isDisabled={!selectedExercise?._id || !configExercise.reps && !configExercise.duration} onClick={() => handleAddExercise({ exerciseId: String(selectedExercise?._id), duration: configExercise.duration, reps: configExercise.reps, description: configExercise.description })} color="primary" disabled={!selectedExercise}>
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





