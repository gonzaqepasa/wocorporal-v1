import { ReactNode } from "react";

interface Props {
    text: string;
    value: string;
    icon?: ReactNode
}


const TextKeyValue: React.FC<Props> = ({ icon, text, value }) => {
    return (<>
        <div className="flex  items-center gap-2">
            {icon && icon}
            <p className=" ">{text}:</p>
            <p className="font-bold">{value}</p>
        </div>
    </>);
}

export default TextKeyValue;