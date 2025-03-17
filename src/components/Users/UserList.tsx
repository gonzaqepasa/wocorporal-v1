/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/exercises.tsx

import { useAuth } from "@/pages/_AuthProvider";
import { TypesUser } from "@/types/user";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@nextui-org/react";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import RoutineIndicator from "./RoutinesIndicator";
import SelectPlanToUser from "./options/SelectPlanToUser";





interface UsersPageProps {
    users: TypesUser[];

}




const UsersList: React.FC<UsersPageProps> = ({ users }) => {
    const { user } = useAuth();

    return (

        <>
            <div>
            </div>
            <Table radius="none" className="  w-screen overflow-auto " aria-label='none' >
                <TableHeader>
                    <TableColumn>USUARIO</TableColumn>
                    <TableColumn>PLAN</TableColumn>

                    <TableColumn>RUTINAS</TableColumn>
                    <TableColumn>OPCIONES</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {users.map((u) => (
                        <TableRow className={`${u.status === "deptor" && "bg-warning-500/40"}`} key={u._id}>
                            <TableCell className="text-sm flex items-center gap-1 text-nowrap">
                                <User
                                    avatarProps={{
                                        src: u.image,
                                    }}
                                    description={u.email}
                                    name={u.name}
                                />
                            </TableCell>
                            <TableCell  >
                                <div className='flex flex-col items-start'>
                                    <p className="font-semibold">{u.plan.selectedPlan.name}</p>
                                    <p className={`capitalize px-2 rounded-full text-xs shadow ${u.status === "active" ? "bg-success-500" : "bg-warning-500"} `}>{u.status}</p>
                                </div>


                            </TableCell>

                            <TableCell className='p-0'>
                                <RoutineIndicator rutinas={u.routines} />
                            </TableCell>
                            <TableCell className='p-0'>
                                <Button className="min-w-0" variant="light">
                                    <Link href={`/trainer/users/edit/${u._id}?apiKey=${user?.apiKey}`}>
                                        <BiEdit />
                                    </Link>
                                </Button>
                                {/* Editar */}
                                {/* Seleccionar plan */}
                                {/* Cambiar Estado */}
                                {/* Agregar pago */}
                                <SelectPlanToUser us={u} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default UsersList;
