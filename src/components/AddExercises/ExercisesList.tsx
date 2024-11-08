// pages/exercises.tsx
import { sortExercises } from '@/logic/order/orderlist';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';


interface Exercise {
    _id: string;
    name: string;
    description: string;
    muscles: string;
    equipment: string;
    difficulty: number;
    videoUrl: string;
}

interface ExercisesPageProps {
    exercises: Exercise[];
    error: string | null;
}

export const getServerSideProps = async () => {
    try {
        const response = await fetch(`api/exercises`);
        if (!response.ok) {
            throw new Error('Error al cargar los ejercicios');
        }
        const exercises = await response.json();

        return {
            props: { exercises, error: null },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            props: { exercises: [], error: error.message || 'Hubo un problema al cargar los ejercicios' },
        };
    }
};

const ExerciseList: React.FC<ExercisesPageProps> = ({ exercises, error }) => {
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (exercises.length === 0) {
        return <p className="text-center text-gray-500">No hay ejercicios disponibles.</p>;
    }

    return (
        <div className="">
            <h2 className="text-xl font-bold ">Listado de Ejercicios</h2>
            <Table className=" max-w-lg w-[95vw] overflow-auto " aria-label='none' >
                <TableHeader>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>DIFICULTAD</TableColumn>
                </TableHeader>
                <TableBody>
                    {sortExercises(exercises, "name").map((exercise) => (
                        <TableRow className='text-neutral-800 ' key={exercise._id}>
                            <TableCell className="text-lg text-nowrap">{exercise.name}</TableCell>
                            <TableCell>{exercise.difficulty}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ExerciseList;
