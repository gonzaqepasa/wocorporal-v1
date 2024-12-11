import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/mongoose/db_mongo";
import Routine from "@/mongoose/models/Routine";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      await dbConnect();

      const { routineId, fromIndex, toIndex } = req.body;

      // Encuentra la rutina
      const routine = await Routine.findById(routineId);
      if (!routine) {
        return res.status(404).json({ error: "Rutina no encontrada" });
      }

      // Reorganizar los sets
      const sets = routine.sets;
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= sets.length ||
        toIndex >= sets.length
      ) {
        return res.status(400).json({ error: "Índices inválidos" });
      }

      // Mover el set
      const [movedSet] = sets.splice(fromIndex, 1); // Remueve el set en `fromIndex`
      sets.splice(toIndex, 0, movedSet); // Inserta en `toIndex`

      // Guarda los cambios
      routine.sets = sets;
      await routine.save();

      res.status(200).json({ message: "Set reordenado exitosamente", routine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al reordenar los sets" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
