import { GetServerSideProps } from "next";
import { url } from "@/config/env_d";
import { TypesSet } from "@/types/sets";
import EditSetForm from "@/components/Sets/edit/EditSetForm";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  try {
    // Hacer la petición al servidor para obtener el set por ID
    const response = await fetch(`${url}/api/sets/get/?id=${id}`);
    if (!response.ok) throw new Error("Error al cargar el set");

    const set = await response.json();
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
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!set) {
    return <p className="text-gray-500 text-center">No se pudo encontrar el set.</p>;
  }

  return <main className="min-h-screen flex flex-col items-center">
    <EditSetForm set={set} />;

  </main>
};

export default EditSetPage;
