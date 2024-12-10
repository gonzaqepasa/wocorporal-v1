import ErrorPageMain from "@/components/Globals/pages/ErrorPages";
import { url } from "@/config/env_d";
// import SetsList from "@/components/Sets/SetsList";
// import { Button } from "@nextui-org/react";
// import { useState } from "react";
import { GetServerSideProps } from "next";
interface RoutineListPageProps {
    rutina: [];
    error: string | null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params || {};
    try {
        // Hacer la petición al servidor para obtener el set por ID
        const response = await fetch(`${url}/api/routine/get/${id}`);
        if (!response.ok) throw new Error("Error al cargar la rutina");

        const rutina = await response.json();
        return { props: { rutina, error: null } };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            props: { set: null, error: error.message || "Hubo un problema al cargar la rutina" },
        };
    }
};



const EditRoutinePage: React.FC<RoutineListPageProps> = ({ rutina, error }) => {
    // const [routine, setRoutine] = useState<any>(null);
    // const [loading, setLoading] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const handleUpdate = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch(`/api/routines/${routineId}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(routine),
    //         });

    //         if (!response.ok) throw new Error("Error al actualizar la rutina");
    //         alert("Rutina actualizada con éxito");
    //     } catch (error) {
    //         console.error(error);
    //         alert("Error al actualizar la rutina");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    console.log(rutina, error)
    if (error) return <ErrorPageMain>
        <p>{error}</p>
    </ErrorPageMain>
    return (<>
        <main className="min-h-screen flex flex-col items-center" >


        </main>
    </>);
}

export default EditRoutinePage;