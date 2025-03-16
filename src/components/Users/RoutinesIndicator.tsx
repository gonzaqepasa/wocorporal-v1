
const weekDays = [
    { key: "lunes", short: "L" },
    { key: "martes", short: "M" },
    { key: "miercoles", short: "M" },
    { key: "jueves", short: "J" },
    { key: "viernes", short: "V" },
    { key: "sabado", short: "S" },

];

interface RoutineIndicatorProps {
    rutinas: Record<string, unknown>; // Recibe cualquier objeto
}

export default function RoutineIndicator({ rutinas }: RoutineIndicatorProps) {
    // Convertir los valores a string | null
    const parsedRutinas: Record<string, string | null> = Object.fromEntries(
        Object.entries(rutinas).map(([key, value]) => [key, typeof value === "string" ? value : null])
    );

    return (
        <div className="flex gap-1">
            {weekDays.map(({ key, short }) => (
                <div key={key}  >
                    <p
                        className={`w-5 h-5 flex items-center justify-center rounded-full text-white text-xs font-bold 
              ${parsedRutinas[key] ? "bg-green-500" : "bg-gray-300"}`}
                    >
                        {short}
                    </p>
                </div>
            ))}
        </div>
    );
}
