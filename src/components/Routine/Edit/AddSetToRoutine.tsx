import CustomSelect from "@/components/Globals/select/CustomSelect";
import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { TypesRoutine } from "@/types/routine";
import { TypesSet } from "@/types/sets";
import { showErrorAlert, showSuccessAlert } from "@/utils/SweetAlertUtils";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";

interface Props {
    rutina: TypesRoutine
    onAddSet: Dispatch<SetStateAction<TypesSet[]>>
}

const AddSetToRoutine: React.FC<Props> = ({ rutina ,onAddSet}) => {
    const { user } = useAuth()

   
    const [load, setLoad] = useState<boolean>(true);

    const [sets, setSets] = useState<TypesSet[]>([])
    const [selectedSet, setSelectedSet] = useState<TypesSet>()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(`${url}/set/getAll?apiKey=${user.apiKey}`);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Error al cargar los sets");
                }
                const data = await response.json();
                // console.log(data)
                setSets(data);
                
                setLoad(false)
            } catch (error) {
                setLoad(false)
                console.error(error);
            }
        };

        if (isOpen) {
            fetchExercises();
        }
    }, [isOpen, user.apiKey]);



    const handleSelectExercise = (setId: Set<never>) => {
        // const exercise = exercises.find((exercise) => exercise.id === String(exerciseId));
        const set = sets?.find((set) => set._id === Array.from(setId)[0]);
        // console.log(exercise);
        setSelectedSet(set);


    }

    const handleAddSet = async ({ setId }: { setId: string }) => {
        if (selectedSet) {
            try {
                const response = await fetch(`${url}/routine/assign-set/${rutina._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                        , Authorization: `Bearer ${user?.token}`
                    },
                    body: JSON.stringify({ setId }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.log(error.error);
                    throw new Error(error.error || "Error al agregar el ejercicio al set");
                }

                const data: TypesRoutine = await response.json()
                showSuccessAlert({ title: "Set agregado", text: "El set se agregó correctamente" })
                // console.log("ASDASDASD",data.sets)
                onAddSet(data.sets)
                onOpenChange()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error(error);
                showErrorAlert(error.message)
            }

        }
    };

    return (<>


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
                                {selectedSet && <p className="text-lg text-neutral-200">{selectedSet.name}</p>}
                                {/* {selectedExercise && <Difficulty size={12} difficulty={selectedExercise.difficulty} />} */}
                                {/* {selectedExercise && <p className="text-xs text-neutral-400 font-light">{formatUpdatedAt(selectedExercise.updatedAt)}</p>} */}
                            </span>
                            <form className="flex gap-4">



                            </form>
                            {load ? <p>Cargando...</p> :
                                <>
                                    <CustomSelect exercises={sets} onChangeExercise={handleSelectExercise} />
                                </>

                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button isDisabled={!selectedSet?._id} onClick={() => handleAddSet({ setId: String(selectedSet?._id) })} color="primary" disabled={!selectedSet}>
                                Agregar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >

    </>);
}

export default AddSetToRoutine;