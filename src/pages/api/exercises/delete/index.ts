// pages/api/exercises.ts
import exerciseService from '@/services_app/Exercises/Exercises';
import type { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    switch (req.method) {


        case 'DELETE': // Eliminar un ejercicio por ID
            try {
                const { id } = req.query;
                if (!id) return res.status(404).json({ error: 'Se necesita la id del ejercicio' });
                const exercise = await exerciseService.deleteExercise(id?.toString());
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
