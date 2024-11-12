interface Exercise {
    createdAt: string | number | Date;
    _id: string;
    name: string;
    description: string;
    muscles: string;
    equipment: string;
    difficulty: number;
    videoUrl: string;
}

/**
 * Función para ordenar un array de ejercicios según un parámetro específico.
 * @param exercises - Array de ejercicios a ordenar.
 * @param sortBy - Parámetro por el cual se ordenará ('name', 'difficulty', etc.).
 * @returns Array de ejercicios ordenados.
 */
export const sortExercises = (exercises: Exercise[], sortBy: string) => {
    return exercises.sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name); // Ordenar por nombre
        }
        if (sortBy === "difficulty") {
            return a.difficulty - b.difficulty; // Ordenar por dificultad (número)
        }
        if (sortBy === "createdAt") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Ordenar por fecha de creación
        }
        return 0;
    });
};

