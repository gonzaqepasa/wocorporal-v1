
import { Input, Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import Swal from "sweetalert2";

interface Exercise {
    _id: string;
    name: string;
    description: string;
    muscles: string;
    equipment: string;
    difficulty: number;
    videoUrl: string;
}

interface EditExerciseFormProps {
    exercise: Exercise;
    onSuccess: () => void;
}
const EditExercise: React.FC<EditExerciseFormProps> = ({ exercise, onSuccess }) => {


    const [formData, setFormData] = useState<Exercise>(exercise);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`/api/exercises?id=${formData._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error("Error al actualizar el ejercicio");
          }
    
          Swal.fire("Actualizado", "El ejercicio se ha actualizado correctamente", "success");
          onSuccess();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          Swal.fire("Error", err.message || "Hubo un problema al actualizar el ejercicio", "error");
        }
      };
    

  



    

    return (
        <div className="p-4 bg-neutral-400 max-w-xl w-full">
            <h2 className="text-xl font-bold mb-4">Editar Ejercicio</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  
                />
                <Textarea
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  
                />
                <Input
                    label="Músculos"
                    name="muscles"
                    value={formData.muscles}
                    onChange={handleInputChange}
                   
                />
                <Input
                    label="Equipamiento"
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleInputChange}
                 
                />
                <Input
                    label="Dificultad (1-5)"
                    type="number"
                    name="difficulty"
                    value={formData.difficulty.toString()}
                    onChange={handleInputChange}
                    min={1}
                    max={5}
                   
                />
                <Input
                    label="URL del Video"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                />
                <Button type="submit">Actualizar Ejercicio</Button>
            </form>
        </div>
    );
};

export default EditExercise;
