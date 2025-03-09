import { TypesSet } from "@/types/sets";

// import DeleteSet from "../delete/DeleteSet";
import UpdateSetComponent from "./UpdateSet";
import TableRenderExercercises from "./TableRenderExercises";
import { Card } from "@nextui-org/react";



interface EditSetFormProps {
    set: TypesSet;
}

const EditSetForm: React.FC<EditSetFormProps> = ({ set }) => {

    //   const handleAddExercise = (exercise: Exercise) => {
    //     setExercises([...exercises, exercise]);
    //   };



    return (
        <>
            <Card className="p-4 flex gap-2 flex-col items-center max-w-lg w-full  rounded-lg  ">
                <h2 className="text-2xl font-bold mb-4">Editar Set</h2>
                <UpdateSetComponent set={{
                    description: set.description,
                    name: set.name,
                    rounds: set.rounds,
                    _id: set._id
                }}
                />
                <TableRenderExercercises set={set} />

                {/* <div> */}
                {/* <DeleteSet set={set} onDeleteSuccess={() => router.push(`/sets`)} /> */}
                {/* </div> */}

            </Card>

        </>
    );
};

export default EditSetForm;
