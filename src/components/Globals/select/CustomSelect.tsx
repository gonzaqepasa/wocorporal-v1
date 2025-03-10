import { TypesExercise } from "@/types/exercises";
import { capitalizeWords } from "@/utils/TextUtils";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

interface Props {
    exercises: TypesExercise[]
    onChangeExercise: (exerciseId: Set<never>) => void
}

const CustomSelect: React.FC<Props> = ({ exercises, onChangeExercise }) => {

    const [values, setValues] = useState(new Set([]));
    // console.log(exercises)
    // console.log(values)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSelectionChange = (e: any) => {
        // console.log(e.target)
        setValues(new Set(e.target.value.split(",")));
        onChangeExercise(new Set(e.target.value.split(",")))
    };
    return (<>
        <Select

            label="Ejercicios"

            placeholder={"Selecciona un ejercicio"}
            className="max-w-xs"


            selectedKeys={values}

            onChange={handleSelectionChange}
        >

            {exercises.map((exercise) => (
                <SelectItem key={exercise._id} value={exercise._id}>{capitalizeWords(exercise.name)}</SelectItem>
            ))}

        </Select>

    </>);
}

export default CustomSelect;