// pages/api/exercises.ts
import dbConnect from '@/mongoose/db_mongo';
import Exercise from '@/mongoose/models/Exercise';
import { TypesExercise } from '@/types/exercises';
import type { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    switch (req.method) {
        case 'POST': // Crear un nuevo ejercicio
            try {
                const exercise = new Exercise(req.body as TypesExercise);
                await exercise.save();
                return res.status(201).json(exercise);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                return res.status(400).json({ error: 'Error al crear el ejercicio', msg: error.message });
            }

        case 'GET': // Obtener un ejercicio específico o todos
            try {
                const { id } = req.query;

                if (id) {
                    // Si hay un id en la query, buscar un solo ejercicio
                    const exercise = await Exercise.findById(id);
                    if (!exercise) {
                        return res.status(404).json({ error: 'Ejercicio no encontrado' });
                    }
                    return res.status(200).json(exercise);
                } else {
                    // Si no hay id, devolver todos los ejercicios
                    const exercises = await Exercise.find();
                    return res.status(200).json(exercises);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                return res.status(500).json({ msg: 'Error al obtener ejercicios', error: error });
            }

        case 'PUT': // Actualizar un ejercicio por ID
            try {
                const { id } = req.query;
                const exercise = await Exercise.findByIdAndUpdate(id, req.body as TypesExercise, { new: true });
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
