import CustomSelect from "@/components/Globals/select/CustomSelect";
import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { TypesPlan } from "@/types/plan";
import { TypesUser } from "@/types/user";
import { showErrorAlert } from "@/utils/SweetAlertUtils";
import { showSuccessAlert } from "@/utils/SweetAlertUtils";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";

interface Props {
    us: TypesUser
    onAddPlan?: () => void
}


const SelectPlanToUser: React.FC<Props> = ({ us }) => {
    const { user } = useAuth()


    const [load, setLoad] = useState<boolean>(true);

    const [planes, setPlanes] = useState<TypesPlan[]>([])
    const [selectedPlan, setSelectedPlan] = useState<TypesPlan>()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    useEffect(() => {

        const fetchExercises = async () => {
            try {
                const response = await fetch(`${url}/plan/getAll?apiKey=${user.apiKey}`);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Error al cargar los planes");
                }
                const data = await response.json();
                // console.log(data)
                setPlanes(data);

                setLoad(false)
            } catch (error) {
                setLoad(false)
                console.error(error);
            }
        };

        if (isOpen) {
            fetchExercises();
        }

    }, [isOpen, user])


    const handleSelectExercise = (planId: Set<never>) => {
        // const exercise = exercises.find((exercise) => exercise.id === String(exerciseId));
        const res = planes?.find((p) => p._id === Array.from(planId)[0]);
        // console.log(exercise);
        setSelectedPlan(res);


    }




    const handleSubmitPlan = async ({ planId }: { planId: string }) => {
      
        if (selectedPlan) {
            try {
                const response = await fetch(`${url}/user/assign-plan`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                        , Authorization: `Bearer ${user?.token}`
                    },
                    body: JSON.stringify({ planId, userId: us._id }),
                });

                const data = await response.json();
                if (!response.ok) {
                    console.log(data.error);
                    throw new Error(data.error || "Error al agregar el ejercicio al set");
                }

                showSuccessAlert({ title: "Set agregado", text: "El set se agregó correctamente" })
                // console.log("ASDASDASD",data.sets)
                // on(data.sets)
                onOpenChange()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error(error);
                showErrorAlert(error.message)
            }

        }
    };

    return (<>

        <Button onPress={onOpen} variant="light" color="primary">Add Plan</Button>
        <Modal isOpen={isOpen} className="" onOpenChange={onOpenChange}>
            <ModalContent>
                {onClose => (
                    <>

                        <ModalHeader className="flex flex-col p-2 bg-primary-300 gap-1">
                            <h3 id="modal-title" className="flex items-center gap-1 text-base text-neutral-200" >
                                <GrAdd className="text-primary-700" />
                                Selecionnar un plan para el usuario                           </h3>

                        </ModalHeader>
                        <ModalBody>
                            <span className=" flex flex-col gap-1">
                                {selectedPlan && <p className="text-lg text-neutral-200">{selectedPlan.name}</p>}
                                {/* {selectedExercise && <Difficulty size={12} difficulty={selectedExercise.difficulty} />} */}
                                {/* {selectedExercise && <p className="text-xs text-neutral-400 font-light">{formatUpdatedAt(selectedExercise.updatedAt)}</p>} */}
                            </span>
                            <form className="flex gap-4">



                            </form>
                            {load ? <p>Cargando...</p> :
                                <>
                                    <CustomSelect exercises={planes} onChangeExercise={handleSelectExercise} />
                                </>

                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button isDisabled={!selectedPlan?._id} onClick={() => handleSubmitPlan({ planId: String(selectedPlan?._id) })} color="primary" disabled={!selectedPlan}>
                                Agregar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >

    </>);
}

export default SelectPlanToUser;