import dbConnect from "@/mongoose/db_mongo";
import Routine from "@/mongoose/models/Routine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            await dbConnect();

            const routines = await Routine.find();
            res.status(200).json(routines);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener las rutinas" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}