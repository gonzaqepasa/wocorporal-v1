import dbConnect from '@/mongoose/db_mongo';
import Set from '@/mongoose/models/Set';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        // PUT /api/sets/:id/add-exercise
        try {
            await dbConnect()
            const { id } = req.query;
            const set = await Set.findByIdAndDelete(id);
            if (!set) {
                return res.status(404).json({ error: 'Set no encontrado' });
            }
            return res.status(200).json({ message: 'Set eliminado con éxito' });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: 'Error al eliminar el set' });
        }
    } else {
        return res.status(500).json({ error: 'El metodo no corresponde' });
    }
}
