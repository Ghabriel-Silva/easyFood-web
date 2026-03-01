import { Text } from "@chakra-ui/react"
import { fontWeigthText, fontText } from "@/theme/ChakraUI/themes"


export function TableText({
    ...props
}) {
    return (
        <Text
            fontSize={fontText}
            fontWeight={fontWeigthText}
            color={'fg'}
            {...props}
        />
    )
}
