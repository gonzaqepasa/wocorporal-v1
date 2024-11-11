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

// Ejemplo de uso:
const exercises: Exercise[] = [
    { _id: "1", name: "Push Up", description: "Basic push up", muscles: "Chest", equipment: "None", difficulty: 2, videoUrl: "" },
    { _id: "2", name: "Pull Up", description: "Pull up exercise", muscles: "Back", equipment: "Bar", difficulty: 2, videoUrl: "" },
    { _id: "3", name: "Squat", description: "Bodyweight squat", muscles: "Legs", equipment: "None", difficulty: 2, videoUrl: "" },
];

// Ordenar los ejercicios por nombre
const sortedExercises = sortExercises(exercises, 'name');
console.log(sortedExercises);
