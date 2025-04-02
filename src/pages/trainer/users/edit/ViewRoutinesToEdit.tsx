import { TypesRoutine } from "@/types/routine";
import { TypesUser } from "@/types/user";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";



interface Props {
    user: TypesUser
}

const ViewRoutineToEdit: React.FC<Props> = ({ user }) => {

    const rutinas: {
        lunes?: TypesRoutine;
        martes?: TypesRoutine;
        miercoles?: TypesRoutine;
        jueves?: TypesRoutine;
        viernes?: TypesRoutine;
        sabado?: TypesRoutine;
    } = user.routines




    const RutinasArray = [
        { day: "lunes", routine: rutinas.lunes },
        { day: "martes", routine: rutinas.martes },
        { day: "miercoles", routine: rutinas.miercoles },
        { day: "jueves", routine: rutinas.jueves },
        { day: "viernes", routine: rutinas.viernes },
        { day: "sabado", routine: rutinas.sabado },
    ]



    return (<>
        <Table>
            <TableHeader>
                <TableColumn>DIA</TableColumn>
                <TableColumn>RUTINA</TableColumn>
                {/* <TableColumn>OPCIÓNES</TableColumn> */}
            </TableHeader>

            <TableBody>
                {RutinasArray.map(r => (
                    <TableRow key={r.day} className={`${r.routine && "bg-success-500/50"}`}>
                        <TableCell><p className="capitalize">{r.day}</p></TableCell>
                        <TableCell>{r.routine?.name}</TableCell>
                    </TableRow>
                ))}


            </TableBody>

        </Table>

    </>);
}

export default ViewRoutineToEdit;