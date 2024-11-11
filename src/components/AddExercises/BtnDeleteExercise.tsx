import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

interface BtnDeleteExerciseProps {
    id: string; // ID del ejercicio a eliminar
    onDeleteSuccess: () => void; // Callback para actualizar la lista después de la eliminación
}

const BtnDeleteExercise: React.FC<BtnDeleteExerciseProps> = ({ id, onDeleteSuccess }) => {
    const router = useRouter()
    const handleDelete = async () => {
        // Mostrar alerta de confirmación
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esta acción no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                // Realizar la solicitud DELETE a la API
                const response = await fetch(`/api/exercises/?id=${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Error al eliminar el ejercicio");
                }

                // Mostrar alerta de éxito
                Swal.fire("¡Eliminado!", "El ejercicio ha sido eliminado.", "success");

                // Llamar al callback para actualizar la lista
                onDeleteSuccess();
                router.reload()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                // Mostrar alerta de error
                console.log(error)
                Swal.fire("Error", "No se pudo eliminar el ejercicio.", "error");
            }
        }
    };

    return (
        <Button color="danger" variant="light" className="p-1 min-w-10"  onClick={handleDelete}>
            <MdDelete />
        </Button>
    );
};

export default BtnDeleteExercise;
