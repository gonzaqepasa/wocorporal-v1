/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/exercises.tsx

import { TypesSet } from "@/types/sets";
import { capitalizeWords } from "@/utils/TextUtils";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";





interface ExercisesPageProps {
    sets: TypesSet[];
    error: string | null;
}




const SetsList: React.FC<ExercisesPageProps> = ({ sets, error }) => {
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (sets.length === 0) {
        return <p className="text-center text-gray-500">No hay ejercicios disponibles.</p>;
    }

    return (

        <>
            <div>
            </div>
            <Table className=" max-w-lg w-[95vw] overflow-auto " aria-label='none' >
                <TableHeader>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>N</TableColumn>
                    <TableColumn>TIPO</TableColumn>
                    <TableColumn>OPCIONES</TableColumn>
                </TableHeader>
                <TableBody >
                    {sets.map((set) => (
                        <TableRow className='text-neutral-800 ' key={set._id}>
                            <TableCell className="text-sm text-nowrap">
                                <p>{capitalizeWords(set.name)}</p>
                            </TableCell>
                            <TableCell className='' ><p>{set.exercises.length}</p></TableCell>
                            <TableCell className=''>
                                <p>{capitalizeWords(set.type)}</p>
                            </TableCell>
                            <TableCell className='p-0'>
                                <Button className="min-w-0" variant="light">
                                    <Link href={`/sets/edit/${set._id}`}>
                                        <BiEdit />
                                    </Link>

                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default SetsList;
