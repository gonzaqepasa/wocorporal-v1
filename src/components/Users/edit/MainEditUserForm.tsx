import { Card } from "@nextui-org/react";
import { TypesUser } from "@/types/user";
import ViewUser from "../ViewUser";



interface EditUserFormProps {
    user: TypesUser;
}

const MainEditUserForm: React.FC<EditUserFormProps> = ({ user }) => {

    //   const handleAddExercise = (exercise: Exercise) => {
    //     setExercises([...exercises, exercise]);
    //   };



    return (
        <>
            <Card className="p-4 flex gap-2 flex-col items-center max-w-lg w-full  rounded-lg  ">

                <ViewUser user={user} />

                {/* <UpdateSetComponent set={{
                    description: set.description,
                    name: set.name,
                    rounds: set.rounds,
                    _id: set._id
                }}
                />
                <TableRenderExercercises set={set} /> */}



            </Card>

        </>
    );
};

export default MainEditUserForm;
