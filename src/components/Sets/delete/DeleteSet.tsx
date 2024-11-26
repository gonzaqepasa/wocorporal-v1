import { useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalContent } from "@nextui-org/react";
import { TypesSet } from "@/types/sets";

interface DeleteSetProps {
    set: TypesSet;
    onDeleteSuccess?: () => Promise<boolean>; // Callback opcional para actualizar la lista tras eliminar
}

const DeleteSet: React.FC<DeleteSetProps> = ({ set, onDeleteSuccess }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);

    const handleDeleteSet = async () => {
        setLoading(true);

        try {
            const response = await fetch(`/api/sets/delete/${set._id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar el set");

            alert("Set eliminado correctamente");
            onOpenChange(); // Cierra el modal
            onDeleteSuccess?.(); // Ejecuta el callback si existe
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el set");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button color="danger" onPress={onOpen}>
                Eliminar Set
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark">
                <ModalContent>
                    {(onClose => (
                        <>
                            <ModalHeader>
                                <h3 className="text-lg font-bold">Eliminar Set</h3>
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    ¿Estás seguro de que quieres eliminar el set{" "}
                                    <span className="font-semibold">{set.name}</span>? Esta acción no se puede deshacer.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onClick={() => onClose()}>
                                    Cancelar
                                </Button>
                                <Button color="danger" isLoading={loading} onPress={handleDeleteSet}>
                                    Eliminar
                                </Button>
                            </ModalFooter>
                        </>
                    ))}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteSet;
