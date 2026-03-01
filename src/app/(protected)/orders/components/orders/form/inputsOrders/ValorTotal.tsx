import {fontSizeTitleLabel, fontText } from "@/theme/ChakraUI/themes"
import { Box, FormatNumber, HStack, Text } from "@chakra-ui/react"
type OrderSummaryProps = {
    total: number | string
}

export function OrderSummary({ total }: OrderSummaryProps) {
    const isError = typeof total === "string"

    return (
        <Box
            mt={6}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg="bg.subtle"
            borderColor={isError ? "border.error" : "border.emphasized"}
        >
            <Text fontSize={fontSizeTitleLabel} fontWeight="semibold" mb={2}>
                Resumo do Pedido
            </Text>

            <HStack justify="space-between">
                <Text fontSize="lg" >
                    Total
                </Text>

                {isError ? (
                    <Text
                        fontSize={fontText}
                        fontWeight="bold"
                        color="red.600"
                        maxW="80%"
                        textAlign="center"
                    >
                        {total}
                    </Text>
                ) : (
                    <Text fontSize="lg" fontWeight="bold" >
                        <FormatNumber
                            value={total}
                            style="currency"
                            currency="BRL"
                        />
                    </Text>
                )}
            </HStack>
        </Box>
    )
}
