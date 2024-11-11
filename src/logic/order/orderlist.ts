interface Exercise {
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
export const sortExercises = (exercises: Exercise[], sortBy: keyof Exercise): Exercise[] => {
    return exercises.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB);
        }

        // Manejar otros tipos de comparación si es necesario
        return 0;
    });
};

