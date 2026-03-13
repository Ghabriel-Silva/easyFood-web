import { VStack, Heading } from "@chakra-ui/react"
import { AvatarConfig} from "@/app/(protected)/config/components/index"
import { fontTitle, fontWeigthTitle } from "@/theme/ChakraUI/themes"


export const ThemeContainer = () => {
    return (
        <VStack  flex={1} gap={10} p="8" boxShadow={"sm"} >
            <Heading size={fontTitle} fontWeight={fontWeigthTitle}>Informação de Tema</Heading>
            <AvatarConfig />
        </VStack>
    )
}