export const formatCreatedAt = (createdAt: string | Date): string => {
    // Asegúrate de que `createdAt` sea un objeto de fecha
    const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;

    // Opciones de formato para mostrar día y hora
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Muestra la hora en formato 24h
    };

    // Usamos Intl.DateTimeFormat para formatear la fecha
    return new Intl.DateTimeFormat('es-ES', options).format(date);
};