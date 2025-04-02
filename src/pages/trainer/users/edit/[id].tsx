import { GetServerSideProps } from "next";
import { url } from "@/config/env_d";

import { TypesUser } from "@/types/user";
import MainEditUserForm from "@/components/Users/edit/MainEditUserForm";
import ProtectedRoute from "@/pages/_ProtectedRoute";
import ErrorPageMain from "@/components/Globals/pages/ErrorPages";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params || {};
    const { apiKey } = context.query
    try {
        // Hacer la petición al servidor para obtener el user por ID
        const response = await fetch(`${url}/user/getById/${id}?apiKey=${apiKey}`);
        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            throw new Error(error.error || "Hubo un problema al cargar el usuario");
        }

        const user = await response.json();
        return { props: { user, error: null } };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            props: { user: null, error: error.message || "Hubo un problema al cargar el usuario" },
        };
    }
};

const EditSetPage = ({ user, error }: { user: TypesUser; error: string | null }) => {
    if (error) {
        return <ErrorPageMain>
            <p className="text-red-500 text-center">{error}</p>;

        </ErrorPageMain>
        // return <main className="min-h-screen flex flex-col items-center gap-2 ">
        // </main>
    }


    return <>
        <ProtectedRoute allowedRoles={["admin", "trainer"]}>

            <main className="min-h-screen flex flex-col items-center gap-2 ">
                <MainEditUserForm user={user} />
            </main>
        </ProtectedRoute>
    </>

};

export default EditSetPage;
