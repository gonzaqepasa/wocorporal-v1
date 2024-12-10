
import dbConnect from "@/mongoose/db_mongo";
import Routine from "@/mongoose/models/Routine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { name, description, level } = req.body;
            if (!name) res.status(202).json({ msg: "Debe ingresar un nombre." })

            await dbConnect();
            const routine = await Routine.create({ name, description, sets: [], level });
            res.status(201).json(routine);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al crear la rutina" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}