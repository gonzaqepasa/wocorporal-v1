import { TypesRoutine } from "@/types/routine";
// import DeleteSet from "../delete/DeleteSet";

import { Card } from "@nextui-org/react";
import UpdateRoutineComponent from "./UpdateRoutineComponent";
// import AddSetToRoutine from "./AddSetToRoutine";
import TableRenderSetsEdit from "./TableRenderSetsEdit";



interface EditSetFormProps {
    rutina: TypesRoutine;
}

const EditRoutineForm: React.FC<EditSetFormProps> = ({ rutina }) => {

    //   const handleAddExercise = (exercise: Exercise) => {
    //     setExercises([...exercises, exercise]);
    //   };




    return (
        <>
            <Card className="p-4 flex gap-2 flex-col items-center max-w-lg w-full  rounded-lg  ">
                <h2 className="text-2xl font-bold mb-4">Editar Rutina</h2>






                <UpdateRoutineComponent rutina={rutina} />
                <TableRenderSetsEdit rutina={rutina} />
                



                {/* <div> */}
                {/* <DeleteSet set={set} onDeleteSuccess={() => router.push(`/sets`)} /> */}
                {/* </div> */}

            </Card>

        </>
    );
};

export default EditRoutineForm;
