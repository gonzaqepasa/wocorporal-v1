/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/exercises.tsx
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';
import BtnDeleteExercise from './BtnDeleteExercise';
import DifficultyFires from '../Difficult/DifficultyFires';
import { capitalizeWords } from '@/utils/TextUtils';
import ExerciseSorter from './ExerciseSort';
import { formatCreatedAt } from '@/utils/DateUtils';
import ExerciseModal from '../ExerciseModal/ExerciseModal';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';
// import ExerciseSorter from './ExerciseSort';


interface Exercise {
    createdAt: Date;
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




const ExerciseList: React.FC<ExercisesPageProps> = ({ exercises, error }) => {
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (exercises.length === 0) {
        return <p className="text-center text-gray-500">No hay ejercicios disponibles.</p>;
    }

    return (
        <div className="">
            <ExerciseSorter sortOptions={["name", "difficulty", "createdAt"]} />
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
                            <TableCell className="text-sm text-nowrap">
                                <p>
                                    {capitalizeWords(exercise.name)}
                                </p>
                                <p className='text-[11px]'>
                                    {formatCreatedAt(exercise.createdAt)}
                                </p>
                            </TableCell>
                            <TableCell className='p-0' >{DifficultyFires({ difficulty: exercise.difficulty, size: 15 })}</TableCell>
                            <TableCell className='p-0 flex'>
                                <BtnDeleteExercise id={exercise._id} onDeleteSuccess={() => { }} />
                                <ExerciseModal exercise={exercise} />
                                <Button className='min-w-4' variant='light'>
                                    <Link href={`/exercises/edit?id=${exercise._id}`}>
                                        <MdEdit  />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ExerciseList;
