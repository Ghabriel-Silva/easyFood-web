import { Stack, Text, Button, HStack } from "@chakra-ui/react"
import {SelectProducts } from "@/app/(protected)/orders/components/orders/form/index"

interface CreateOrdersProps {
    token: string
}
export const FormGetProducts = ({ token }: CreateOrdersProps) => {
    return (

        <Stack width={"full"}>
            <Text>Produto/Quantidade</Text>
            <HStack>
                <SelectProducts token={token} />
            </HStack>
            <Button size="xs" colorPalette="green" variant="outline" w={"120px"}>
                Add Produto
            </Button>
        </Stack>
    )
}


