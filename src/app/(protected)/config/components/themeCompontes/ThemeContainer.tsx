import { VStack, Heading } from "@chakra-ui/react"
import { AvatarConfig, FontSizeSelector, CustomColorPicker} from "@/app/(protected)/config/components/index"


export const ThemeContainer = () => {
    return (
        <VStack  flex={1} gap={10} minW={"280px"} p="8" boxShadow={"sm"}>
            <Heading>Informação de Tema</Heading>
            <AvatarConfig />
            <FontSizeSelector />
            <CustomColorPicker />
        </VStack>
    )
}