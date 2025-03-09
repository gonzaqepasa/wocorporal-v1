/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/exercises.tsx

import { useAuth } from "@/pages/_AuthProvider";
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
    const { user } = useAuth();
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }


    return (

        <>
            <div>
            </div>
            <Table radius="none" className="  w-screen overflow-auto " aria-label='none' >
                <TableHeader>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>N° Ej</TableColumn>
                    <TableColumn>TIPO</TableColumn>
                    <TableColumn>OPCIONES</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {sets.map((set) => (
                        <TableRow className=' ' key={set._id}>
                            <TableCell className="text-sm text-nowrap">
                                <p>{capitalizeWords(set.name)}</p>
                            </TableCell>
                            <TableCell className='' ><p>{set.exercises.length}</p></TableCell>
                            <TableCell className=''>
                                <p>{capitalizeWords(set.type)}</p>
                            </TableCell>
                            <TableCell className='p-0'>
                                <Button className="min-w-0" variant="light">
                                    <Link href={`/trainer/sets/edit/${set._id}?apiKey=${user?.apiKey}`}>
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
