import { ColorLabel, fontSizeTitleLabel, fontText } from "@/theme/ChakraUI/themes"
import { Avatar, VStack, Stack, Text } from "@chakra-ui/react"
import { useUserData } from "../../hooks/useUserData"


export const AvatarConfig = () => {
    const { data } = useUserData()
    return (
        <VStack>
            <Avatar.Root colorPalette="green" w="120px" h="120px">
                <Avatar.Fallback name={data?.data.name} />
            </Avatar.Root>
            <Stack gap="0">
                <Text fontWeight="medium" fontSize={fontText} textAlign={"center"}>{data?.data.name} </Text>
                <Text color={ColorLabel} textStyle={fontSizeTitleLabel}>
                    {data?.data.email}
                </Text>
            </Stack>
        </VStack>
    )
}