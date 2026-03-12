import { Avatar, VStack, Stack, Text } from "@chakra-ui/react"


export const AvatarConfig = () => {
    return (
        <VStack>
            <Avatar.Root colorPalette="red"  w="120px" h="120px">
                <Avatar.Fallback name="Lanches Marechal" />
                <Avatar.Image src="https://bit.ly/broken-link" />
            </Avatar.Root>
            <Stack gap="0">
                <Text fontWeight="medium">Lanches Marechal</Text>
                <Text color="fg.muted" textStyle="sm">
                    ghaabrriel@gmail.com
                </Text>
            </Stack>
        </VStack>
    )
}