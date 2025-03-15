import { TypesSet } from "./sets";
import { TypesUser } from "./user";

export interface TypesRoutine {
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    owner:TypesUser
    name: string;
    goal:string
    description?: string;
    sets: TypesSet[]
    level?: 1 | 2 | 3 | 4 | 5;
    videoUrl?: string;
}