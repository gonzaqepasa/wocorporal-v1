/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/exercises.tsx
import { sortExercises } from '@/logic/order/orderlist';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';
import BtnDeleteExercise from './BtnDeleteExercise';
import DifficultyFires from '../Difficult/DifficultyFires';
import { capitalizeWords } from '@/utils/TextUtils';
// import ExerciseSorter from './ExerciseSort';


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

export const getServerSideProps = async ({ query }: any) => {
    const { sort = "name" } = query; // Si no se pasa un parámetro 'sort', usamos "name" por defecto

    try {
        console.log("kjgakjhgkjghkjhj", sort)
        const response = await fetch(`api/exercises`);
        if (!response.ok) {
            throw new Error('Error al cargar los ejercicios');
        }
        const exercises = await response.json();

        // Ordenar los ejercicios según el parámetro de la query
        const sortedExercises = sortExercises(exercises, sort);

        return {
            props: { exercises: sortedExercises, error: null },
        };
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
            {/* <ExerciseSorter sortOptions={["name", "difficulty", "createdAt"]} /> */}
            <h2 className="text-xl font-bold ">Listado de Ejercicios</h2>
            <Table className=" max-w-lg w-[95vw] overflow-auto " aria-label='none' >
                <TableHeader>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>DIFICULTAD</TableColumn>
                    <TableColumn>OPCIONES</TableColumn>
                </TableHeader>
                <TableBody >
                    {exercises.map((exercise) => (
                        <TableRow className='text-neutral-800 p-0' key={exercise._id}>
                            <TableCell className="text-sm text-nowrap">{capitalizeWords(exercise.name)}</TableCell>
                            <TableCell className='p-0' >{DifficultyFires({ difficulty: exercise.difficulty, size: 15 })}</TableCell>
                            <TableCell className='p-0'><BtnDeleteExercise id={exercise._id} onDeleteSuccess={() => { }} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ExerciseList;
