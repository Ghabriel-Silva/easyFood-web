import { Collapsible, HStack, VStack, DataList, Stack, Badge, Text } from "@chakra-ui/react"
import { MdArrowForwardIos } from "react-icons/md"
import { useState } from "react"
import { IOrderItem } from "../interfaces/orders-data"

interface OrderItem {
    orderItens: IOrderItem[]
}

export const DialogOrderItems: React.FC<OrderItem> = ({ orderItens }) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)} >
            <Collapsible.Trigger
                py="6"
                display="flex"
                gap="1"
                alignItems="center"
                cursor="pointer"
            >
                <Collapsible.Indicator
                    transition="transform 0.2s"
                    _open={{ transform: "rotate(90deg)" }}
                >
                    <MdArrowForwardIos size={14} />
                </Collapsible.Indicator>
                <Text fontWeight="medium" fontSize="sm">Itens do Pedido</Text>
            </Collapsible.Trigger>

            <Collapsible.Content>
                <VStack align="start" gap={3}>
                    {orderItens.map((item, index) => {
                        const { name, description } = item.product ?? {}
                        return (
                            <Stack
                                key={index}
                                gap={3}
                                w="full"
                                borderWidth="1px"
                                borderRadius="md"
                                p="2"
                            >
                                <DataList.Root gap={2}>
                                    <HStack >
                                        <DataList.Item bg={"blue"}>
                                            <Stack justify="space-between" w="full" gap={2}>
                                                <Badge colorPalette="purple" fontSize="10px" borderRadius="md" w={"50px"} >
                                                    Produto
                                                </Badge>
                                                <Stack gap={0} >
                                                    <Text fontWeight="semibold" fontSize="sm">{name}</Text>
                                                    {/* <Text fontSize="xs" color="gray.600">{description}</Text> */}
                                                </Stack>
                                            </Stack>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel fontSize="xs">Qtd</DataList.ItemLabel>
                                            <DataList.ItemValue fontSize="xs">
                                                {item.quantity}
                                            </DataList.ItemValue>
                                        </DataList.Item>

                                        <DataList.Item>
                                            <DataList.ItemLabel fontSize="xs">Preço</DataList.ItemLabel>
                                            <DataList.ItemValue fontSize="xs">
                                                {item.price}
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    </HStack>

                                    <DataList.Item>
                                        <DataList.ItemLabel fontSize="xs">Subtotal</DataList.ItemLabel>
                                        <DataList.ItemValue fontSize="xs">
                                            {item.subtotal}
                                        </DataList.ItemValue>
                                    </DataList.Item>
                                </DataList.Root>
                            </Stack>
                        )
                    })}
                </VStack>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
