/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/exercises.tsx

import { useAuth } from "@/pages/_AuthProvider";
import { TypesRoutine } from "@/types/routine";
import { capitalizeWords } from "@/utils/TextUtils";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import Difficulty from "../Difficult/DifficultyFires";





interface RoutinesPageProps {
    routines: TypesRoutine[];
    error: string | null;
}




const RoutinesList: React.FC<RoutinesPageProps> = ({ routines, error }) => {
    const { user } = useAuth();
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }


    return (

        <>

            <Table radius="none" className="  w-screen overflow-auto " aria-label='none' >
                <TableHeader>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>N° SETS</TableColumn>
                    <TableColumn>NIVEL</TableColumn>
                    <TableColumn>OPCIONES</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {routines.map((r) => (
                        <TableRow className=' ' key={r._id}>
                            <TableCell className="text-sm text-nowrap">
                                <p>{capitalizeWords(r.name)}</p>
                            </TableCell>
                            <TableCell className='' ><p>{r.sets.length}</p></TableCell>
                            <TableCell className=''>
                                {Difficulty({ difficulty: r.level, size: 15 })}
                            </TableCell>
                            <TableCell className='p-0'>
                                <Button className="min-w-0" variant="light">
                                    <Link href={`/trainer/rutinas/edit/${r._id}?apiKey=${user?.apiKey}`}>
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

export default RoutinesList;
