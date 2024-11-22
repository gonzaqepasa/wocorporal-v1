export interface TypesSet {
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    name: string;
    description: string;
    type: 'amrap' | 'tabata' | 'rounds' | 'cluster' | 'dropset' | 'emom'
    exercises: Array<{
        exercise: TypesExercise,
        reps: number,
        duration: number
        rest: number
    }>
    rounds: number
}