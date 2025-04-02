import CustomSelect from "@/components/Globals/select/CustomSelect";
import { url } from "@/config/env_d";
import { useAuth } from "@/pages/_AuthProvider";
import { TypesRoutine } from "@/types/routine";
import { TypesUser } from "@/types/user";
import { showErrorAlert, showSuccessAlert } from "@/utils/SweetAlertUtils";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import SelectDay from "./SelectDay";
import { MdOutlineAssignment } from "react-icons/md";
import { HiCalendarDays } from "react-icons/hi2";
import { FcList } from "react-icons/fc";

interface Props {
    userToAdd: TypesUser
    onAddRoutine?: Dispatch<SetStateAction<TypesRoutine[]>>
}

const AddRoutineToUser: React.FC<Props> = ({ userToAdd, onAddRoutine }) => {
    const { user } = useAuth()


    const [load, setLoad] = useState<boolean>(true);

    const [routines, setRoutines] = useState<TypesRoutine[]>([])
    const [SelectedRoutine, setSelectedRoutine] = useState<TypesRoutine>()
    const [SelectedDay, setSelectedDay] = useState<string>("lunes")
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(`${url}/routine/getAll?apiKey=${user.apiKey}`);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Error al cargar los sets");
                }
                const data = await response.json();
                console.log(data)
                setRoutines(data);

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



    const handleSelectRoutine = (routineId: Set<never>) => {
        // const exercise = exercises.find((exercise) => exercise.id === String(exerciseId));routineId
        const routine = routines?.find((r) => r._id === Array.from(routineId)[0]);
        // console.log(exercise);
        setSelectedRoutine(routine);
    }

    const handleAddRoutine = async (routineId: string) => {
        if (SelectedRoutine) {
            try {
                const response = await fetch(`${url}/user/assign-routine`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                        , Authorization: `Bearer ${user?.token}`
                    },
                    body: JSON.stringify({ userId: userToAdd._id, day: SelectedDay, routineId }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.log(error.error);
                    throw new Error(error.error || "Error al agregar la rutina al usuario");
                }

                const data: TypesRoutine[] = await response.json()
                showSuccessAlert({ title: "Set agregado", text: "La rutina se selecciono correctamente" })
                // console.log("ASDASDASD",data.sets)
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                onAddRoutine && onAddRoutine(data)
                onOpenChange()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error(error);
                showErrorAlert(error.message)
            }

        }
    };

    return (<>


        <Button onPress={onOpen} variant="light" color="primary"><MdOutlineAssignment />
            ASIGNAR RUTINA</Button>
        <Modal isOpen={isOpen} className="" onOpenChange={onOpenChange}>
            <ModalContent>
                {onClose => (
                    <>

                        <ModalHeader className="flex flex-col p-3  gap-1">
                            <h3 id="modal-title" className="flex items-center gap-1 text-base " >
                                <GrAdd className="text-primary-700" />{`Asignar rutina a ${userToAdd.name}`}</h3>
                        </ModalHeader>
                        <ModalBody>
                            <span className=" flex flex-col gap-1 ">
                                {SelectedRoutine && <p className="flex items-center gap-1 text-lg capitalize font-medium ">
                                    <FcList />
                                    {SelectedRoutine?.name || "Nombre de rutina"}
                                </p>}
                                {SelectedDay && <p className=" flex items-center  gap-1 text-base italic  capitalize">
                                    <HiCalendarDays />
                                    {SelectedDay || "No se selecciono día "}
                                    </p>}
                                {/* {selectedExercise && <p className="text-xs text-neutral-400 font-light">{formatUpdatedAt(selectedExercise.updatedAt)}</p>} */}
                            </span>
                            <form className="flex gap-4">



                            </form>
                            {load ? <p>Cargando...</p> :
                                <>
                                    <CustomSelect exercises={routines} onChangeExercise={handleSelectRoutine} />
                                    <SelectDay onChangeDay={setSelectedDay} />
                                </>

                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button isDisabled={!SelectedRoutine?._id} onClick={() => handleAddRoutine(String(SelectedRoutine?._id))} color="primary" disabled={!SelectedRoutine}>
                                Agregar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >

    </>);
}

export default AddRoutineToUser;