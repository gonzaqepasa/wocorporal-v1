import { capitalizeWords } from "@/utils/TextUtils";
import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";


interface Props {
    onChangeDay: Dispatch<SetStateAction<string>>
}

const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

const SelectDay: React.FC<Props> = ({ onChangeDay }) => {

    // const [values, setValues] = useState(days);
    // console.log(days[0])
    // console.log(values)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSelectionChange = (e: any) => {
        onChangeDay(e.target.value)
    };


    return (<>
        <Select

            label="Días"
            placeholder={"Selecciona un dia"}
            className="max-w-xs"
            defaultSelectedKeys={days}
            onChange={handleSelectionChange}
        >

            {days.map((d) => (
                <SelectItem key={d} value={d}>{capitalizeWords(d)}</SelectItem>
            ))}

        </Select>

    </>);
}

export default SelectDay