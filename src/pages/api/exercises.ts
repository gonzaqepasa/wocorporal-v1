// pages/api/exercises.ts
import dbConnect from '@/mongoose/db_mongo';
import Exercise from '@/mongoose/models/Exercise';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ExerciseData {
    name: string;
    description?: string;
    muscles?: string[];
    equipment?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    videoUrl?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    switch (req.method) {
        case 'POST': // Crear un nuevo ejercicio
            try {
                const exercise = new Exercise(req.body as ExerciseData);
                await exercise.save();
                return res.status(201).json(exercise);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                return res.status(400).json({ error: 'Error al crear el ejercicio', msg: error.message });
            }

        case 'GET': // Obtener todos los ejercicios
            try {
                const exercises = await Exercise.find();
                return res.status(200).json(exercises);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
            } catch (error: any) {
                return res.status(500).json({ error: 'Error al obtener ejercicios' });
            }

        case 'PUT': // Actualizar un ejercicio por ID
            try {
                const { id } = req.query;
                const exercise = await Exercise.findByIdAndUpdate(id, req.body as ExerciseData, { new: true });
                if (!exercise) return res.status(404).json({ error: 'Ejercicio no encontrado' });
                return res.status(200).json(exercise);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
            } catch (error: any) {
                return res.status(400).json({ error: 'Error al actualizar ejercicio' });
            }

        case 'DELETE': // Eliminar un ejercicio por ID
            try {
                const { id } = req.query;
                const exercise = await Exercise.findByIdAndDelete(id);
                if (!exercise) return res.status(404).json({ error: 'Ejercicio no encontrado' });
                return res.status(200).json({ message: 'Ejercicio eliminado' });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
            } catch (error: any) {
                return res.status(400).json({ error: 'Error al eliminar ejercicio' });
            }

        default:
            return res.status(405).json({ error: 'Método no permitido' });
    }
}
