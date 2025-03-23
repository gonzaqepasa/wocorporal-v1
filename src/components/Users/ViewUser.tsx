import { TypesUser } from "@/types/user";
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import ViewPlan from "../Globals/plan/ViewPlan";
import { formatCreatedAt } from "../Globals/formats/DateUtils";
import AddRoutineToUser from "./edit/AddRoutineToUser";

interface Props {
    user: TypesUser
    config?: {
        imgSize?: number
        // display?: "vertical" | "horizontal"
        shadow?: "none" | "sm" | "md" | "lg" | undefined
        radius?: "none" | "sm" | "md" | "lg" | "full" | undefined
        nameSize?: "text-sm" | "text-base" | "text-lg" | "text-xl" | "text-2xl"
    }
}

const ViewUser: React.FC<Props> = ({ user, config }) => {
    const inactive = user.status === "inactive"
    console.log(user)
    return (<>

        <Card shadow={config?.shadow} className={`w-full p-0 `}>
            <CardHeader className={`flex  items-center flex-col sm:flex-row`}>
                <Image radius={config?.radius} src={user?.image} height={config?.imgSize || 100} alt={user?.name} />
                <div className="ml-4">
                    <div>
                        <h2 className={`${config?.nameSize} font-bold`}>{user.name}</h2>
                    </div>
                    <div>

                        <p className="text-sm italic text-gray-600">{user?.email}</p>
                    </div>
                    <div className=" flex gap-1 items-center">
                        <p className="text-xs font-bold uppercase">{user?.role}</p>-
                        <p className={`text-xs  capitalize ${user.status === "active" && "text-success-600"}`}>{user?.status}</p>
                    </div>

                    <div className="flex flex-col sm:items-center  sm:justify-start sm:flex-row  gap-2">
                        <strong className={`text-sm text-nowrap`}>{"API KEY:"}</strong>
                        <p className="text-sm">{user.apiKey}</p>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-2">
                <ViewPlan plan={user.plan.selectedPlan} config={{ viewFeatures: true, inactive, viewPrice: true }} />
                <div className="flex justify-around w-full">


                    <div className="flex flex-col items-center ">
                        <p className="text-neutral-500 text-sm">
                            Fecha de inicio:
                        </p>
                        <strong>{formatCreatedAt(user.plan.planStartDate)}</strong>
                    </div>
                    <div className="flex flex-col items-center ">
                        <p className="text-neutral-500 text-sm">
                            Fecha de vencimiento:
                        </p>
                        <strong>{formatCreatedAt(user.plan.planEndDate)}</strong>
                    </div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter >

                <AddRoutineToUser userToAdd={user} />

            </CardFooter>
        </Card>

    </>);
}

export default ViewUser;