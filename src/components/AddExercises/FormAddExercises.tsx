// components/ExerciseForm.tsx
import { showErrorAlert, showSuccessAlert } from '@/utils/SweetAlertUtils';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';

interface ExerciseFormProps {
    onSuccess: () => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        muscles: '',
        equipment: '',
        difficulty: 1,
        videoUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({
                    name: '',
                    description: '',
                    muscles: '',
                    equipment: '',
                    difficulty: 1,
                    videoUrl: '',
                });
                onSuccess(); // Llamada de retorno en caso de éxito
                showSuccessAlert("El ejercicio se agrego correctamente")
            } else {
                console.error('Error al agregar el ejercicio');

                showErrorAlert('Ocurrió un error inesperado')
            }
        } catch (error) {
            showErrorAlert((error as Error).message || 'Ocurrió un error inesperado')
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-lg w-full flex flex-col gap-6 bg-gray-300 text-neutral-900 rounded-lg shadow-md">

            <Input
                color='primary'
                label="Nombre"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full "
                required
            />




            <Textarea
                label="Descripción"
                color='primary'
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full"
            ></Textarea>




            <Input
                color='primary'
                label="Grupos musculares (separados por comas)"
                type="text"
                id="muscles"
                name="muscles"
                value={formData.muscles}
                onChange={handleChange}
                className="w-full "
            />




            <Input
                color='primary'
                label="Equipamiento necesario"
                type="text"
                id="equipment"
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                className="w-full"
            />



            <Select
                label={"Dificultad"}
                color='primary'
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full  "
            >
                <SelectItem className='text-neutral-800' key={1} value={1}>1</SelectItem>
                <SelectItem className='text-neutral-800' key={2} value={2}>2</SelectItem>
                <SelectItem className='text-neutral-800' key={3} value={3}>3</SelectItem>
                <SelectItem className='text-neutral-800' key={4} value={4}>4</SelectItem>
                <SelectItem className='text-neutral-800' key={5} value={5}>5</SelectItem>
            </Select>



            <Input
                color='primary'
                label={"URL del video"}
                type="url"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full p-2"
            />


            <Button type="submit" color='primary'>
                Agregar Ejercicio
            </Button>
        </form>
    );
};

export default ExerciseForm;
