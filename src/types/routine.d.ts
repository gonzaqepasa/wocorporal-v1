import { TypesSet } from "./sets";

export interface TypesRoutine {
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    name: string;
    description?: string;
    sets: TypesSet[]
    level?: 1 | 2 | 3 | 4 | 5;
    videoUrl?: string;
}