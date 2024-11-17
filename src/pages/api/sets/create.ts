// pages/api/exercises.ts
import dbConnect from '@/mongoose/db_mongo';
import Set from '@/mongoose/models/Set';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {

        try {
            const { name, type } = req.body;
            if (!name || !type) {
                return res.status(400).json({ error: 'El nombre y el tipo de circuito son requeridos' });
            }
            await dbConnect();

            const newSet = await Set.create({ name, type, exercises: [] });
            return res.status(201).json(newSet);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: 'Error al crear el set' });
        }
    } else {
        return res.status(500).json({ error: 'El metodo no es el correcto ' });
    }
}
