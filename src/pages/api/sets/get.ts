// pages/api/exercises.ts
import dbConnect from '@/mongoose/db_mongo';
import Set from '@/mongoose/models/Set';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            await dbConnect();
            const { id, ids } = req.query;

            if (id) {
                // Si se proporciona un solo ID, busca ese set específico
                const set = await Set.findById(id);
                if (!set) {
                    return res.status(404).json({ error: 'Set no encontrado' });
                }
                return res.status(200).json(set);
            } else if (ids) {
                // Si se proporciona un array de IDs, busca los sets correspondientes
                const idsArray = Array.isArray(ids) ? ids : [ids];
                const sets = await Set.find({ _id: { $in: idsArray } });
                return res.status(200).json(sets);
            } else {
                // Si no se proporciona ningún ID, devuelve todos los sets
                const sets = await Set.find();
                return res.status(200).json(sets);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: 'Error al obtener los sets' });
        }
    } else {
        return res.status(500).json({ error: 'Método no permitido' });

    }
}
