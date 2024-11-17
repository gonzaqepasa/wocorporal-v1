import dbConnect from '@/mongoose/db_mongo';
import Set from '@/mongoose/models/Set';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        // PUT /api/sets/:id/add-exercise
        try {
            const { id } = req.query;
            const { exerciseId, reps, duration, rest } = req.body;


            if (!exerciseId) return res.status(404).json({ error: 'Necesito el Id del ejercicio para agregar' });


            await dbConnect();
            const set = await Set.findById(id);
            if (!set) {
                return res.status(404).json({ error: 'Set no encontrado' });
            }

            set.exercises.push({ exercise: exerciseId, reps, duration, rest });
            await set.save();

            return res.status(200).json(set);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: 'Error al agregar el ejercicio al set' });
        }
    } else {
        return res.status(500).json({ error: 'El metodo no corresponde' });
    }
}
