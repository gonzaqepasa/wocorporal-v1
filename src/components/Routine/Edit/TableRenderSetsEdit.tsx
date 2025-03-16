import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useState } from "react";
import { TypesRoutine } from "@/types/routine";
import AddSetToRoutine from "./AddSetToRoutine";
import { TypesSet } from "@/types/sets";
import RemoveSetModal from "./RemoveSetModal";


interface Props {
    rutina: TypesRoutine
    handleRemoveExercise?: (exerciseId: string) => void
}

const TableRenderSetsEdit: React.FC<Props> = ({ rutina }) => {


    // const []=useState()
    const [sets, setSets] = useState<TypesSet[]>(rutina.sets)


    // console.log("esto se va a sets",sets)


    return (<>

        <div className="max-w-lg w-full flex flex-col  rounded-lg shadow ">
            <Table className="" shadow="none" removeWrapper aria-label="Tabla de ejercicios">
                <TableHeader>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>EJERCICIO</TableColumn>
                    <TableColumn>OPCIONES</TableColumn>
                </TableHeader>
                <TableBody>


                    {sets?.map((s, i) => (
                        <TableRow key={i}>
                            <TableCell >
                                <div className="flex gap-1 items-center">




                                    {s.name && <div className={`rounded text-neutral-800 capitalize `}>
                                        <p className="text-base">{`${s.name}`}</p>
                                    </div>}

                                </div>

                            </TableCell>
                            <TableCell>
                                {s.type && <div className={`rounded text-primary-800 capitalize`}>
                                    <p className="text-sm">{`${s.type}`}</p>
                                </div>}


                            </TableCell>
                            <TableCell>
                                <RemoveSetModal onRemoveSet={setSets} rutina={rutina} setId={s._id} />
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table >
            <AddSetToRoutine rutina={rutina} onAddSet={setSets} />
        </div>

    </>);
}

export default TableRenderSetsEdit;