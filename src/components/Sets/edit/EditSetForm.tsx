import { useState } from "react";
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from "@nextui-org/react";
import { TypesSet } from "@/types/sets";
import { useRouter } from "next/router";
import AddExerciseToSet from "./AddExersiceToSet";
import { BiSave } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import ExerciseModal from "@/components/ExerciseModal/ExerciseModal";
import DeleteSet from "../delete/DeleteSet";





interface EditSetFormProps {
    set: TypesSet;
}

const EditSetForm: React.FC<EditSetFormProps> = ({ set }) => {
    const [name, setName] = useState(set.name);
    const [description, setDescription] = useState(set.description || "");
    const [rounds, setRounds] = useState(set.rounds);
    const router = useRouter()
    //   const handleAddExercise = (exercise: Exercise) => {
    //     setExercises([...exercises, exercise]);
    //   };

    const handleRemoveExercise = async (exerciseId: string) => {
        try {
            const response = await fetch(`/api/sets/remove-exercise/${set._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ exerciseId }),
            });

            if (!response.ok) throw new Error("Error al actualizar el set");

            // Redirigir o mostrar un mensaje de éxito
            alert("Set actualizado correctamente");
            router.reload()
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el set");
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/sets/update/${set._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, rounds }),
            });

            if (!response.ok) throw new Error("Error al actualizar el set");

            // Redirigir o mostrar un mensaje de éxito
            alert("Set actualizado correctamente");
            router.reload()
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el set");
        }
    };

    return (
        <>
            <div className="p-4 flex flex-col items-center max-w-lg w-full bg-neutral-900 rounded-lg shadow dark">
                <h2 className="text-2xl font-bold mb-4">Editar Set</h2>
                <div className="flex flex-wrap gap-2 max-w-md">
                    <Button className=" w-min  min-w-0 " variant="light" onClick={handleSubmit} isDisabled={set.name === name && set.description === description && set.rounds === rounds} color="primary" fullWidth>
                        <BiSave size={22} />
                        {/* <p>Guardar</p> */}
                    </Button>
                    <Input
                        color="primary"
                        variant="faded"
                        className=" w-20"
                        label="Rondas"
                        type="number"
                        value={`${rounds}`}
                        onChange={(e) => setRounds(Number(e.target.value))}
                        fullWidth
                    />
                    <Input
                        color="primary"
                        variant="faded"
                        className=" w-64"
                        label="Nombre del Set"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <Textarea
                        color="primary"
                        variant="faded"
                        label="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />

                </div>

            </div>

            {/* RENDER EXERCISES FROM SET */}
            <div className="max-w-lg w-full flex flex-col bg-neutral-900 rounded-lg shadow dark">
                <Table className="dark" shadow="none" removeWrapper >
                    <TableHeader>
                        <TableColumn>REST/DUR/REPS</TableColumn>
                        <TableColumn>EJERCICIO</TableColumn>
                        <TableColumn>OPCIONES</TableColumn>
                    </TableHeader>
                    <TableBody>


                        {set.exercises.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell >
                                    <div className="flex gap-1 items-center">

                                        <div className={`${!e.rest && "opacity-30"} rounded text-primary-900 bg-black px-1`}>
                                            <p>{`${e.rest}''`}</p>
                                        </div>

                                        <div className={`${!e.duration && "opacity-30"} rounded text-primary-600 bg-black px-1`}>
                                            <p className="text-lg">{`${e.duration}''`}</p>
                                        </div >
                                        <div className={`${!e.reps && "opacity-30"} rounded text-primary-400 bg-black px-1`}>
                                            <p className="text-lg">{`${e.reps}x `}</p>
                                        </div>

                                    </div>

                                </TableCell>
                                <TableCell>
                                    {/* <p>{capitalizeWords(e.exercise.name)}</p> */}
                                    <ExerciseModal exercise={e.exercise} />
                                </TableCell>
                                <TableCell>
                                    <Button variant="light" color="danger" className={`min-w-0`} onPress={() => handleRemoveExercise(e.exercise._id)}>
                                        <FaDeleteLeft />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table >
                <AddExerciseToSet setId={set._id} />
                <div>
                    <DeleteSet set={set} onDeleteSuccess={() => router.push(`/sets`)} />
                </div>
            </div>


        </>
    );
};

export default EditSetForm;
