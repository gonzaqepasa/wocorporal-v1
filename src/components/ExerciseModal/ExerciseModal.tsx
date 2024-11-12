import { capitalizeWords } from "@/utils/TextUtils";
import { Modal, Button, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { MdPlayCircle } from "react-icons/md";
import Difficulty from "../Difficult/DifficultyFires";

interface Exercise {
    exercise: {
        createdAt: Date;
        _id: string;
        name: string;
        description: string;
        muscles: string;
        equipment: string;
        difficulty: number;
        videoUrl: string;
    }
}

const ExerciseModal: React.FC<Exercise> = ({ exercise }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();




    return (
        <div>
            {/* Ícono de reproducción */}
            <Button color="primary" variant="light" className="p-1 min-w-10" onPress={onOpen}>
                <MdPlayCircle size={24} />
            </Button>

            {/* Modal de NextUI */}
            <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalHeader>
                                <div className="flex flex-col">

                                    <h2 className="text-lg text-neutral-900 font-bold">
                                        {capitalizeWords(exercise.name)}
                                    </h2>
                                    <Difficulty size={15} difficulty={exercise.difficulty} />
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <>
                                    {exercise.videoUrl && <div className="video-container">
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src={exercise.videoUrl}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>}
                                    {exercise.description && <div>
                                        <p className="text-neutral-700">
                                            {exercise.description}
                                        </p>
                                    </div>}
                                </>
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ExerciseModal;
