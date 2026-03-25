import { Text } from "@chakra-ui/react"

interface PropsTitle {
    title: string
}
export const TextTitle = ({ title }: PropsTitle) => {
    return (
        <Text
            fontSize="xs"
            fontWeight="medium"
            mb={4}
        >
            {title}
        </Text>
    )
}