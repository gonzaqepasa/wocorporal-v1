import { useAuth } from "@/pages/_AuthProvider";
import { Card, CardBody, Image } from "@nextui-org/react";

interface Props {
    config?: {
        imgSize?: number
        display?: "vertical" | "horizontal"
        shadow?: "none" | "sm" | "md" | "lg" | undefined
        radius?: "none" | "sm" | "md" | "lg" | "full" | undefined
        nameSize?: "text-sm" | "text-base" | "text-lg" | "text-xl" | "text-2xl"
    }
}
const MyUserCard: React.FC<Props> = ({ config }) => {
    const { user } = useAuth()
    return (<>
        <Card shadow={config?.shadow} className={`w-full `}>
            <CardBody className={`flex ${config?.display === "vertical" ? "flex-col" : "flex-row"}  items-center`}>
                <Image radius={config?.radius} src={user?.image} height={config?.imgSize || 100} alt={user?.name} />
                <div className="ml-4">
                    <div>
                        <h2 className={`${config?.nameSize} font-bold`}>{user?.name}</h2>
                    </div>
                    <div>

                        <p className="text-sm italic text-gray-600">{user?.email}</p>
                    </div>
                    <div>

                        <p className="text-sm text-primary-600 uppercase">{user?.role}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    </>);
}

export default MyUserCard;