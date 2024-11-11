import { FaFire } from "react-icons/fa";

interface DifficultyProps {
  difficulty?: number | null; // La dificultad puede ser opcional o null
  size: number
}

const Difficulty: React.FC<DifficultyProps> = ({ difficulty, size }) => {
  // Si la dificultad es null o undefined, la establecemos en 0
  const effectiveDifficulty = difficulty ?? 0;

  // Creamos un array de 5 elementos y marcamos los iconos que deben estar encendidos
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <FaFire
          key={index}
          color={index < effectiveDifficulty ? "red" : "gray"}
          size={size}
        />
      ))}
    </div>
  );
};

export default Difficulty;
