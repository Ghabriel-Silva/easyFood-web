import { Text, Flex } from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"
import { LuInfo } from "react-icons/lu"
import { PiChartLineUp, PiChartLineDown } from "react-icons/pi";


type typeChart = "chartLineUp" | "chartLineDow"
interface PropsTitle {
    title: string
    description?: string
    chart?: typeChart
}
export const TextTitle = ({ title, chart, description }: PropsTitle) => {

    function chartType(chart: typeChart) {
        switch (chart) {
            case "chartLineUp":
                return < PiChartLineUp color="green"/>;
            case "chartLineDow":
                return < PiChartLineDown color="red" />;
            default:
                return ""

        }
    }

    return (
        <Flex gap={2} zIndex={"999"}>
            { chart && chartType(chart)}
            <Text
                fontSize="xs"
                fontWeight="medium"
                mb={4}
            >
                {title}
            </Text>
            <Tooltip content={description}>
                <LuInfo />
            </Tooltip>
        </Flex>
    )
}