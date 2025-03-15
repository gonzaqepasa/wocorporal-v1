import ErrorPageMain from "@/components/Globals/pages/ErrorPages";
import EditRoutineForm from "@/components/Routine/Edit/MainEditRoutineForm";
import { url } from "@/config/env_d";
import ProtectedRoute from "@/pages/_ProtectedRoute";
import { TypesRoutine } from "@/types/routine";
// import SetsList from "@/components/Sets/SetsList";
// import { Button } from "@nextui-org/react";
// import { useState } from "react";
import { GetServerSideProps } from "next";
interface RoutineListPageProps {
    rutina: TypesRoutine;
    error: string | null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params || {};
    const { apiKey } = context.query;
    console.log("esto es id", id, apiKey)
    try {
        // Hacer la petición al servidor para obtener el set por ID
        const response = await fetch(`${url}/routine/get/${id}?apiKey=${apiKey}`);
        if (!response.ok) throw new Error();

        const rutina = await response.json();
        if (rutina.error) throw new Error(rutina.error)
        return { props: { rutina, error: null } };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            props: { rutina: null, error: error.message || "Hubo un problema al cargar la rutina" },
        };
    }
};



const EditRoutinePage: React.FC<RoutineListPageProps> = ({ rutina, error }) => {

    console.log(rutina, error)
    if (error) return <ErrorPageMain>
        <p>{error}</p>
    </ErrorPageMain>
    return (<>
        <ProtectedRoute allowedRoles={["trainer"]} >
            <main className="min-h-screen flex flex-col items-center" >
                <EditRoutineForm rutina={rutina} />


            </main>
        </ProtectedRoute>
    </>);
}

export default EditRoutinePage;