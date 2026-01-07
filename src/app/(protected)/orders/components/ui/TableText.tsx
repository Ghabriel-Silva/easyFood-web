import { Text } from "@chakra-ui/react"
import { fontWeigthText, fontText } from "@/themes"


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
