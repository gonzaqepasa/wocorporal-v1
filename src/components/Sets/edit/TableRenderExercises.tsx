import ExerciseModal from "@/components/ExerciseModal/ExerciseModal";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import AddExerciseToSetModal from "./AddExersiceToSet";
import { TypesSet } from "@/types/sets";
import RemoveExerciseModal from "./RemoveExerciseModal";
import { useState } from "react";


interface Props {
    set: TypesSet
    handleRemoveExercise?: (exerciseId: string) => void
}

const TableRenderExercercises: React.FC<Props> = ({ set }) => {


    // const []=useState()
    const [exercises, setExercises] = useState(set.exercises)




    return (<>
        {/* RENDER EXERCISES FROM SET */}
        <div className="max-w-lg w-full flex flex-col  rounded-lg shadow ">
            <Table className="" shadow="none" removeWrapper aria-label="Tabla de ejercicios">
                <TableHeader>
                    <TableColumn>DUR/REPS</TableColumn>
                    <TableColumn>EJERCICIO</TableColumn>
                    <TableColumn>OPCIONES</TableColumn>
                </TableHeader>
                <TableBody>


                    {exercises?.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell >
                                <div className="flex gap-1 items-center">



                                    {e.duration && <div className={`${!e.duration && "opacity-30"} rounded text-primary-400  `}>
                                        <p className="text-sm">{`${e.duration}''`}</p>
                                    </div >}
                                    {e.reps && <div className={`${!e.reps && "opacity-30"} rounded text-primary-800 `}>
                                        <p className="text-lg">{`${e.reps}x `}</p>
                                    </div>}

                                </div>

                            </TableCell>
                            <TableCell>
                                {/* <p>{capitalizeWords(e.exercise.name)}</p> */}
                                <ExerciseModal exercise={e.exercise} />
                            </TableCell>
                            <TableCell>
                                <RemoveExerciseModal onRemoveExercise={setExercises} exerciseId={e.exercise._id} set={set} />
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table >
            <AddExerciseToSetModal setId={set._id} onAddExercise={setExercises} />
        </div>

    </>);
}

export default TableRenderExercercises;