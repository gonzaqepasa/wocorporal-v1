import { useRouter } from 'next/router';
import React from 'react';

interface ExerciseSorterProps {
  sortOptions: string[]; // Opciones de ordenación, por ejemplo, ["name", "difficulty", "muscles"]
}

const ExerciseSorter: React.FC<ExerciseSorterProps> = ({ sortOptions }) => {
  const router = useRouter();
  const { query } = router;

  // Función para manejar el cambio de orden
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;

    // Actualizamos la URL con la nueva query de orden
    router.push({
      pathname: '/exercises',
      query: { ...query, sort: selectedSort }, // Añade o actualiza el parámetro de orden
    });
  };

  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2">Ordenar por:</label>
      <select id="sort" onChange={handleSortChange} className="p-2 border rounded">
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalizamos la opción */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExerciseSorter;
