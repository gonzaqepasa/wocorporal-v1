import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/mongoose/db_mongo";
import Routine from "@/mongoose/models/Routine";
import '@/mongoose/models/Set'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      await dbConnect();

      const { id } = req.query;
      const { setId } = req.body;

      const routine = await Routine.findByIdAndUpdate(
        id,
        { $addToSet: { sets: setId } }, // Evita duplicados 
        { new: true }
      ).populate("sets"); // Opcional: para devolver los sets actualizados

      if (!routine) return res.status(404).json({ error: "Rutina no encontrada" });

      res.status(200).json(routine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al agregar el set a la rutina" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
