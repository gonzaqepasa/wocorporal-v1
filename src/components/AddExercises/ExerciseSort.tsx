import { Select, SelectItem } from '@nextui-org/react';
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
     
      <Select id="sort" variant='flat' color='primary' label='Ordenar por:' value={query.sort} onChange={handleSortChange} className=" text-neutral-800 ">
        {sortOptions.map((option) => (
          <SelectItem key={option} className='text-neutral-600' value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalizamos la opción */}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default ExerciseSorter;
