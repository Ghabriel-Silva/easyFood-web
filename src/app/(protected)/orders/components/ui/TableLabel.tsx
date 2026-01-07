//Componente label para subtitulos deinfido no DialofgInfo, 
import { Text, TextProps } from "@chakra-ui/react"
import { fontSizeTitleLabel, ColorLabel } from "@/themes"

export function TableLabel(props: TextProps) {
    return (
        <Text
            fontSize={fontSizeTitleLabel}
            color={ColorLabel}
            {...props}
        />
    )
}