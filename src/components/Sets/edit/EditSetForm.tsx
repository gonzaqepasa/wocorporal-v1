import { useState } from "react";
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from "@nextui-org/react";
import { TypesSet } from "@/types/sets";
import { useRouter } from "next/router";
import AddExerciseToSet from "./AddExersiceToSet";
import { BiSave } from "react-icons/bi";





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
            <div className="p-4 flex flex-col items-center max-w-md dark">
                <h2 className="text-2xl font-bold mb-4">Editar Set</h2>
                <div className="flex flex-wrap gap-2 max-w-md">
                    <Button className=" w-min  min-w-0 " variant="light" onClick={handleSubmit} isDisabled={set.name === name && set.description === description && set.rounds === rounds} color="primary" fullWidth>
                        <BiSave size={22} />
                        {/* <p>Guardar</p> */}
                    </Button>
                    <Input
                        variant="faded"
                        className=" w-20"
                        label="Rondas"
                        type="number"
                        value={`${rounds}`}
                        onChange={(e) => setRounds(Number(e.target.value))}
                        fullWidth
                    />
                    <Input
                        variant="faded"
                        className=" w-64"
                        label="Nombre del Set"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <Textarea
                        variant="faded"
                        label="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />

                </div>

            </div>

            {/* RENDER EXERCISES FROM SET */}
            <div className="max-w-md">
                <Table className="dark">
                    <TableHeader>
                        <TableColumn>CONFIGURACIÓN</TableColumn>
                        <TableColumn>EJERCICIO</TableColumn>
                        <TableColumn>OPCIONES</TableColumn>
                    </TableHeader>
                    <TableBody>

                        {set.exercises.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell className="flex gap-1 items-center">
                                    {e.duration && <div className=" rounded text-primary-400">
                                        <p>{`${e.duration} seg`}</p>
                                    </div >}
                                    {e.reps && <div className=" rounded text-primary-400">
                                        <p>{`${e.reps} reps`}</p>
                                    </div>
                                    }
                                    {e.rest && <div className=" rounded text-primary-600">
                                        <p>{`${e.rest} seg`}</p>
                                    </div>
                                    }

                                </TableCell>
                                <TableCell>
                                    <p>{e.exercise.name}</p>
                                </TableCell>
                                <TableCell>
                                    <Button onPress={() => handleRemoveExercise(e.exercise._id)}>
                                        DELETE
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table >
            </div>
            <div>
                <AddExerciseToSet setId={set._id} />
            </div>
        </>
    );
};

export default EditSetForm;
