import {
    Collapsible,
    HStack,
    VStack,
    DataList,
    Stack,
    Badge,
    Text,
} from "@chakra-ui/react"
import { MdArrowForwardIos } from "react-icons/md"
import { useState } from "react"
import { IOrderItem } from "@/app/(protected)/orders/interfaces/orders-data"

// 👇 importa suas configs
import {
    fontText,
    fontWeigthText,
    ColorLabel,
    fontSizeTitleLabel
} from "@/themes"

interface OrderItem {
    orderItens: IOrderItem[]
}

export const DialogOrderItems: React.FC<OrderItem> = ({ orderItens }) => {
    const [open, setOpen] = useState(false)

    return (
        <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Collapsible.Trigger
                py="2"
                display="flex"
                gap="2"
                alignItems="center"
                cursor="pointer"
            >
                <Collapsible.Indicator
                    transition="transform 0.2s"
                    _open={{ transform: "rotate(90deg)" }}
                >
                    <MdArrowForwardIos size={12} />
                </Collapsible.Indicator>

                <Text
                    fontSize={fontText}
                    fontWeight={fontWeigthText}
                >
                    Itens do Pedido
                </Text>
            </Collapsible.Trigger>

            <Collapsible.Content>
                <VStack align="stretch" gap={2}>
                    {orderItens.map((item, index) => {
                        const { name, description } = item.product ?? {}

                        return (
                            <Stack
                                key={index}
                                gap={2}
                                w="full"
                                borderWidth="1px"
                                borderRadius="sm"
                                p="2"
                            >
                                <Badge
                                    colorPalette="blue"
                                    fontSize="10px"
                                    borderRadius="sm"
                                    w="fit-content"
                                >
                                    Item {index + 1}
                                </Badge>

                                <DataList.Root gap={1} orientation="vertical">
                                    <HStack justify="space-between" align="start">
                                        <DataList.Item>
                                            <DataList.ItemLabel
                                                fontSize={fontSizeTitleLabel}
                                                color={ColorLabel}
                                            >
                                                Produto
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue fontSize={fontText}>
                                                {name}
                                            </DataList.ItemValue>
                                        </DataList.Item>

                                        <DataList.Item textAlign="right">
                                            <DataList.ItemLabel
                                                fontSize={fontSizeTitleLabel}
                                                color={ColorLabel}
                                            >
                                                Qtd
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue fontSize={fontText}>
                                                {item.quantity}
                                            </DataList.ItemValue>
                                        </DataList.Item>

                                        <DataList.Item textAlign="right">
                                            <DataList.ItemLabel
                                                fontSize={fontSizeTitleLabel}
                                                color={ColorLabel}
                                            >
                                                Preço
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue fontSize={fontText}>
                                                R$ {item.price}
                                            </DataList.ItemValue>
                                        </DataList.Item>

                                        <DataList.Item textAlign="right">
                                            <DataList.ItemLabel
                                                fontSize={fontSizeTitleLabel}
                                                color={ColorLabel}
                                            >
                                                Subtotal
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue
                                                fontSize={fontText}
                                                fontWeight={fontWeigthText}
                                            >
                                                R$ {item.subtotal}
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    </HStack>

                                    {description && (
                                        <DataList.Item>
                                            <DataList.ItemLabel
                                                fontSize={fontSizeTitleLabel}
                                                color={ColorLabel}
                                            >
                                                Descrição
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue fontSize={fontSizeTitleLabel}>
                                                {description}
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    )}
                                </DataList.Root>
                            </Stack>
                        )
                    })}
                </VStack>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
