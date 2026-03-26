import { Text, Flex } from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"
import { LuInfo } from "react-icons/lu"

interface PropsTitle {
    title: string
    description?: string
}
export const TextTitle = ({ title, description }: PropsTitle) => {
    return (
        <Flex gap={2} zIndex={"999"}>
            <Text
                fontSize="xs"
                fontWeight="medium"
                mb={4}
            >
                {title}
            </Text>
            <Tooltip content={description}>
                <LuInfo  />
            </Tooltip>
        </Flex>
    )
}