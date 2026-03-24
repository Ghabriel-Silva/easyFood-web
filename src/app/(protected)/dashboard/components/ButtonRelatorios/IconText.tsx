import { HStack, Text, Icon } from "@chakra-ui/react"
import { MdOutlineDescription } from "react-icons/md";

interface PropsIconText {
    text: string
}
export const IconText = ({ text }: PropsIconText) => {
    return (
        <HStack >
            <Icon size="sm" color="red.focusRing">
                <MdOutlineDescription  />
            </Icon>
            <Text fontSize={"sm"} fontWeight={"light"}>{text}</Text>
        </HStack>
    )

}