import { useEffect, useState } from "react";
import { Modal, Button, Dropdown, ModalHeader, ModalBody, DropdownMenu, DropdownTrigger, DropdownItem, ModalFooter, useDisclosure, ModalContent, Input } from "@nextui-org/react";
import { TypesExercise } from "@/types/exercises";
import { GrAdd } from "react-icons/gr";
import { capitalizeWords } from "@/utils/TextUtils";
import Difficulty from "@/components/Difficult/DifficultyFires";
import { formatUpdatedAt } from "@/utils/DateUtils";
import { showErrorAlert, showSuccessAlert } from "@/utils/SweetAlertUtils";
import { useRouter } from "next/router";





interface Params {
    setId: string

}

const AddExerciseToSet: React.FC<Params> = ({ setId }) => {
    const [exercises, setExercises] = useState<TypesExercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<TypesExercise | null>(null);
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
                const response = await fetch("/api/exercises");
                if (!response.ok) throw new Error("Error al cargar los ejercicios");
                const data = await response.json();
                setExercises(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (isOpen) {
            fetchExercises();
        }
    }, [isOpen]);

    // Manejar la selección de un ejercicio
    const handleSelectExercise = (exerciseId: string) => {
        const exercise = exercises.find((ex) => ex._id === exerciseId) || null;
        setSelectedExercise(exercise);
    };
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
                const response = await fetch(`/api/sets/add-exercise/${setId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ exerciseId, reps, duration, rest }),
                });

                if (!response.ok) throw new Error("Error al actualizar el set");


                showSuccessAlert("Se agrego el ejercicio con exito")
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
            <Modal isOpen={isOpen} className="dark" onOpenChange={onOpenChange}>
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
                                    {selectedExercise && <p className="text-lg text-neutral-200">{capitalizeWords(selectedExercise.name)}</p>}
                                    {selectedExercise && <Difficulty size={12} difficulty={selectedExercise.difficulty} />}
                                    {selectedExercise && <p className="text-xs text-neutral-400 font-light">{formatUpdatedAt(selectedExercise.updatedAt)}</p>}
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
                                <Dropdown className="dark" >
                                    <DropdownTrigger  >
                                        <Button variant="bordered" color="primary">
                                            Selecciona un Ejercicio
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        color="primary"
                                        onAction={(key) => handleSelectExercise(key as string)}
                                        selectedKeys={selectedExercise ? [selectedExercise._id] : []}
                                    >
                                        {exercises.map((exercise) => (
                                            <DropdownItem key={exercise._id}>{capitalizeWords(exercise.name)}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button isDisabled={!selectedExercise?._id || !configExercise.reps && !configExercise.duration} onClick={() => handleAddExercise({ exerciseId: String(selectedExercise?._id), duration: configExercise.duration, reps: configExercise.reps, rest: configExercise.rest })} color="primary" disabled={!selectedExercise}>
                                    Agregar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddExerciseToSet;
