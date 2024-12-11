import { TypesRoutine } from "@/types/routine";

interface Props {
    rutina: TypesRoutine
}

const AddSetToRoutine: React.FC<Props> = ({ rutina }) => {
    console.log("ESTA ES LA RUTINA", rutina.sets)
    return (<>



        {rutina.sets.map(s => (
            <>
                <p>{s.name}</p>
            </>
        ))}

    </>);
}

export default AddSetToRoutine;