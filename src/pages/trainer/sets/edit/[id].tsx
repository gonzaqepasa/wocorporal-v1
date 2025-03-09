import { GetServerSideProps } from "next";
import { url } from "@/config/env_d";
import { TypesSet } from "@/types/sets";
import EditSetForm from "@/components/Sets/edit/MainEditSetForm";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  const { apiKey } = context.query
  try {
    // Hacer la petición al servidor para obtener el set por ID
    const response = await fetch(`${url}/set/getById/${id}?apiKey=${apiKey}`);
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error(error.error || "Hubo un problema al cargar el set");
    }

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
  console.log(set)
  if (error) {
    return <main className="min-h-screen flex flex-col items-center gap-2 p-6">
      <p className="text-red-500 text-center">{error}</p>;
    </main>
  }

  if (!set) {
    return <main className="min-h-screen flex flex-col items-center gap-2 p-6">
      <p className="text-gray-500 text-center">No se pudo encontrar el set.</p>;
    </main>
  }

  return <main className="min-h-screen flex flex-col items-center gap-2 p-6">
    <EditSetForm set={set} />

  </main>
};

export default EditSetPage;
