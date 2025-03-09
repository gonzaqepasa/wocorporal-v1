import ExerciseModal from "@/components/ExerciseModal/ExerciseModal";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { FaDeleteLeft } from "react-icons/fa6";
import AddExerciseToSetModal from "./AddExersiceToSet";
import { TypesSet } from "@/types/sets";
import { useRouter } from "next/router";
import { showErrorAlert } from "@/utils/SweetAlertUtils";

interface Props {
    set: TypesSet
    handleRemoveExercise?: (exerciseId: string) => void
}

const TableRenderExercercises: React.FC<Props> = ({ set }) => {

    const router = useRouter()


    const handleRemoveExercise = async (exerciseId: string) => {
        try {
            const response = await fetch(`/api/sets/remove-exercise/${set._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ exerciseId }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Error al actualizar el set");

            }

            // Redirigir o mostrar un mensaje de éxito
            alert("Set actualizado correctamente");
            router.reload()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            showErrorAlert(error.message)
        }
    };



    return (<>
        {/* RENDER EXERCISES FROM SET */}
        <div className="max-w-lg w-full flex flex-col  rounded-lg shadow ">
            <Table className="" shadow="none" removeWrapper aria-label="Tabla de ejercicios">
                <TableHeader>
                    <TableColumn>REST/DUR/REPS</TableColumn>
                    <TableColumn>EJERCICIO</TableColumn>
                    <TableColumn>OPCIONES</TableColumn>
                </TableHeader>
                <TableBody>


                    {set.exercises.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell >
                                <div className="flex gap-1 items-center">

                                    <div className={`${!e.rest && "opacity-30"} rounded text-primary-900 bg-black px-1`}>
                                        <p>{`${e.rest}''`}</p>
                                    </div>

                                    <div className={`${!e.duration && "opacity-30"} rounded text-primary-600 bg-black px-1`}>
                                        <p className="text-lg">{`${e.duration}''`}</p>
                                    </div >
                                    <div className={`${!e.reps && "opacity-30"} rounded text-primary-400 bg-black px-1`}>
                                        <p className="text-lg">{`${e.reps}x `}</p>
                                    </div>

                                </div>

                            </TableCell>
                            <TableCell>
                                {/* <p>{capitalizeWords(e.exercise.name)}</p> */}
                                <ExerciseModal exercise={e.exercise} />
                            </TableCell>
                            <TableCell>
                                <Button variant="light" color="danger" className={`min-w-0`} onPress={() => handleRemoveExercise(e.exercise._id)}>
                                    <FaDeleteLeft />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table >
            <AddExerciseToSetModal setId={set._id} />
        </div>

    </>);
}

export default TableRenderExercercises;