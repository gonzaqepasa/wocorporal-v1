import { Spinner } from "@nextui-org/react"

const LoadingMain = () => {

    return <main>
        <Spinner classNames={{ label: "text-foreground mt-4" }} color="primary"  />
    </main>
}

export default LoadingMain