import { GetServerSideProps } from "next";
import { url } from "@/config/env_d";
import { TypesSet } from "@/types/sets";
import EditSetForm from "@/components/Sets/edit/MainEditSetForm";
import ErrorPageMain from "@/components/Globals/pages/ErrorPages";
import ProtectedRoute from "@/pages/_ProtectedRoute";
import NavMain from "@/components/Globals/Navs/NavMain";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  const { apiKey } = context.query
  try {
    // Hacer la petición al servidor para obtener el set por ID
    const response = await fetch(`${url}/set/getById/${id}?apiKey=${apiKey}`);
    const set = await response.json();
    if (!response.ok) {
      throw new Error(set.error || "Hubo un problema al cargar el set");
    }

    return { props: { set, error: null } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      props: { set: null, error: error.message || "Hubo un problema al cargar el set" },
    };
  }
};

const EditSetPage = ({ set, error }: { set: TypesSet; error: string | null }) => {
  if (error) {
    return <ErrorPageMain >
      <p className="text-red-500 text-center">{error}</p>;
    </ErrorPageMain>
  }



  return <ProtectedRoute allowedRoles={['admin', 'trainer']}>
    <main className="min-h-screen flex flex-col items-center gap-2 p-6">
      <NavMain />
      <EditSetForm set={set} />

    </main>
  </ProtectedRoute>
};

export default EditSetPage;
