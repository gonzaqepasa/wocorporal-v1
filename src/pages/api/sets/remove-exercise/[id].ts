import dbConnect from '@/mongoose/db_mongo';
import Set from '@/mongoose/models/Set';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {

        try {
            await dbConnect()
            const { id } = req.query;
            const { exerciseId } = req.body;

            const set = await Set.findById(id);
            if (!set) {
                return res.status(404).json({ error: 'Set no encontrado' });
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set.exercises = set.exercises.filter((ex: any) => ex.exercise.toString() !== exerciseId);
            await set.save();

            return res.status(200).json(set);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: 'Error al eliminar el ejercicio del set' });
        }
    } else {
        return res.status(500).json({ error: 'El metodo no corresponde' });
    }
}
