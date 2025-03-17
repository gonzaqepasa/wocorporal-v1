interface PriceFormatProps {
    price: number;
}

export default function PriceFormat({ price }: PriceFormatProps) {
    const formattedPrice = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    }).format(price);

    return <span>{formattedPrice}</span>;
}