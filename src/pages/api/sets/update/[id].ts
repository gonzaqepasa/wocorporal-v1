import dbConnect from '@/mongoose/db_mongo';
import Set from '@/mongoose/models/Set';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        try {
            await dbConnect();
            const { id } = req.query;
            const { name, type, rounds } = req.body;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updates: any = {};
            if (name) updates.name = name;
            if (type) updates.type = type;
            if (rounds) updates.rounds = rounds;

            const updatedSet = await Set.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedSet) {
                return res.status(404).json({ error: 'Set no encontrado' });
            }

            return res.status(200).json(updatedSet);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: 'Error al actualizar el set' });
        }
    } else {
        return res.status(500).json({ error: 'El metodo no corresponde' });


    }
}
