import { TypesPlan } from "@/types/plan";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { FcCheckmark } from "react-icons/fc";
import PriceFormat from "../formats/PriceFormats";

interface Props {
    plan: TypesPlan
    config?: {
        inactive?: boolean
        viewFeatures?: boolean
        viewPrice?: boolean
    }
}

const ViewPlan: React.FC<Props> = ({ plan, config }) => {
    return (<Card className="w-full" isDisabled={config?.inactive}>


        <CardBody >
            <div className="flex flex-col items-start  ">

                <p className=" text-lg font-bold ">{plan.name}</p>
                <p className="text-sm text-neutral-600">{"plan.description"}</p>
                <p className=" shadow py-1 px-3 my-2 rounded-3xl font-medium bg-primary-500 text-white"><PriceFormat price={plan.price} /> ARS</p>
            </div>
        </CardBody>
        <Divider />
        <CardFooter>
            {config?.viewFeatures && plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 ">
                    <FcCheckmark />
                    <p className="first-letter:uppercase " >{f}</p>
                </div>
            ))}
        </CardFooter>
        {/* <p>{user.}</p> */}
    </Card>);
}

export default ViewPlan