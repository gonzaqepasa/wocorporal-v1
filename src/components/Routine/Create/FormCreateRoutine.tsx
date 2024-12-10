import { Card, Input, Button } from "@nextui-org/react";
import { useState } from "react";

const FormCreateRoutine = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState<number | undefined>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !description || !level) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/routine/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, level }),
            });

            if (!response.ok) throw new Error("Error al crear la rutina");

            alert("Rutina creada con éxito");
            setName("");
            setDescription("");
            setLevel(undefined);
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al crear la rutina");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className={`dark p-4 max-w-xl`} fullWidth >
            <div>
                <h3>{`Crear Rutina`}</h3>
            </div>
            <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
                <Input
                    label="Nombre"
                    variant="faded"
                    color="primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    label="Descripción"
                    variant="faded"
                    color="primary"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <Input
                    label="Nivel (1-5)"
                    variant="faded"
                    color="primary"
                    type="number"
                    min={1}
                    max={5}
                    value={level?.toString()}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    required
                />
                <Button type="submit" color="primary" isLoading={loading}>
                    {loading ? "Creando..." : "Crear Rutina"}
                </Button>
            </form>
        </Card>
    );
};

export default FormCreateRoutine;
