import { MdOpenInNew, MdPrint } from "react-icons/md"

import {
    Avatar,
    Flex,
    Badge,
    Icon,
    CloseButton,
    DataList,
    Dialog,
    HStack,
    Portal,
    VStack,
    Center,
    FormatNumber,
    Stat,
    Box
} from "@chakra-ui/react"

import { IOrder } from "@/app/(protected)/orders/interfaces/orders-data"
import { fontText } from "@/themes"
import { calculoPercentualDescon, getRandonColor } from "@/app/(protected)/orders/helpers/index"
import { getStatusOption } from "@/app/(protected)/orders/helpers/index"
import { getPaymentColor } from "@/app/(protected)/orders/helpers/index"
import { calculoPercentualAdicional } from "@/app/(protected)/orders/helpers/index"
import { DialogOrderItems } from "@/app/(protected)/orders/components/orders/dialogs/index"
import { InfoNull } from "../../ui/InfoNull";



import { TableText } from "@/app/(protected)/orders/components/ui/index"
import { TableLabel } from "@/app/(protected)/orders/components/ui/index"

interface DialogProps {
    order: IOrder
}

export const DialogOrder: React.FC<DialogProps> = ({ order }) => {
    const { color } = getStatusOption(order.status)

    return (
        <VStack alignItems="start">
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <HStack>
                        <Badge colorPalette="blue" variant="subtle">
                            <Flex
                                cursor="pointer"
                                align="center"
                                gap={1}
                                _hover={{ color: "blue.900", borderBottom: "1px solid" }}
                            >
                                <HStack gap={1}>
                                    <Icon fontSize="sm">
                                        <MdOpenInNew />
                                    </Icon>

                                    <TableText >
                                        {(order.id.length > 4
                                            ? order.id.slice(0, 4)
                                            : order.id) + " - "}
                                    </TableText>
                                </HStack>

                                <TableText >
                                    {new Date(order.created_at)
                                        .toLocaleString("pt-BR")
                                        .replace(",", " - ")}
                                </TableText>
                            </Flex>
                        </Badge>

                        <Badge colorPalette="blue" variant="subtle">
                            <Center cursor="pointer" w="32px">
                                <MdPrint size={14} />
                            </Center>
                        </Badge>
                    </HStack>
                </Dialog.Trigger>

                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header pb="2">
                                <Dialog.Title fontSize="md" fontWeight="semibold">
                                    Pedido {order.id.slice(0, 4)}
                                </Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body pt="2" pb="6">
                                <DataList.Root orientation="vertical" gap={3} paddingBottom={6}>

                                    {/* Cliente / Status / Data */}
                                    <HStack gap={6} wrap="wrap">
                                        <DataList.Item>
                                            <DataList.ItemLabel>
                                                <TableLabel>Cliente</TableLabel>
                                            </DataList.ItemLabel>

                                            <DataList.ItemValue>
                                                <HStack gap={2}>
                                                    <Avatar.Root
                                                        colorPalette={getRandonColor()}
                                                        size="xs"
                                                    >
                                                        <Avatar.Fallback
                                                            name={order?.customerName || "Nome não informado"}
                                                        />
                                                    </Avatar.Root>

                                                    <TableText>
                                                        {order?.customerName || "Nome não informado"}
                                                    </TableText>
                                                </HStack>
                                            </DataList.ItemValue>
                                        </DataList.Item>

                                        <DataList.Item>
                                            <DataList.ItemLabel>
                                                <TableLabel>Status</TableLabel>
                                            </DataList.ItemLabel>

                                            <DataList.ItemValue>
                                                <Badge colorPalette={color} fontSize={fontText} px="2">
                                                    {order.status}
                                                </Badge>
                                            </DataList.ItemValue>
                                        </DataList.Item>

                                        <DataList.Item>
                                            <DataList.ItemLabel>
                                                <TableLabel>Data/Hora</TableLabel>
                                            </DataList.ItemLabel>

                                            <DataList.ItemValue>
                                                <TableText>
                                                    {new Date(order.created_at)
                                                        .toLocaleString("pt-BR")
                                                        .replace(",", " - ")}
                                                </TableText>
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    </HStack>

                                    {/* Endereço / Telefone / Pagamento */}
                                    <HStack gap={6} wrap="wrap"  align={'start'}>
                                        <DataList.Item>
                                            <DataList.ItemLabel>
                                                <TableLabel>Endereço</TableLabel>
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                <Box>
                                                    {!order.customerAddress && (<InfoNull />)}
                                                    <TableText>{order.customerAddress}</TableText>
                                                </Box>
                                            </DataList.ItemValue>
                                        </DataList.Item>

                                        <DataList.Item>
                                            <DataList.ItemLabel>
                                                <TableLabel>Telefone</TableLabel>
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                <Box>
                                                    {!order.customerPhone && (<InfoNull />)}
                                                    <TableText>{order.customerPhone}</TableText>
                                                </Box>
                                            </DataList.ItemValue>
                                        </DataList.Item>

                                        <DataList.Item>
                                            <DataList.ItemLabel>
                                                <TableLabel>Pagamento</TableLabel>
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                <Badge
                                                    colorPalette={getPaymentColor(order.paymentMethod)}
                                                    fontSize="xs"
                                                >
                                                    {order.paymentMethod}
                                                </Badge>
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    </HStack>

                                    {/* Frete */}
                                    <HStack gap={6} wrap="wrap">
                                        {Number(order.customFreight) > 0 && (
                                            <DataList.Item>
                                                <DataList.ItemLabel>
                                                    <TableLabel>Frete Customizado</TableLabel>
                                                </DataList.ItemLabel>
                                                <DataList.ItemValue>
                                                    <TableText>
                                                        <FormatNumber
                                                            value={parseFloat(order.customFreight)}
                                                            style="currency"
                                                            currency="BRL"
                                                        />
                                                    </TableText>
                                                </DataList.ItemValue>
                                            </DataList.Item>
                                        )}

                                        {Number(order.totalFreight) > 0 && (
                                            <DataList.Item>
                                                <DataList.ItemLabel>
                                                    <TableLabel>Total frete</TableLabel>
                                                </DataList.ItemLabel>
                                                <DataList.ItemValue>
                                                    <TableText>
                                                        <FormatNumber
                                                            value={parseFloat(order.totalFreight)}
                                                            style="currency"
                                                            currency="BRL"
                                                        />
                                                    </TableText>
                                                </DataList.ItemValue>
                                            </DataList.Item>
                                        )}
                                    </HStack>

                                    {/* Valores */}
                                    <HStack gap={6} wrap="wrap">

                                        {/*Adcional valor */}
                                        {Number(order.additionalValue) > 0 && (
                                            <DataList.Item>
                                                <DataList.ItemLabel>
                                                    <TableLabel>Valor adicional</TableLabel>
                                                </DataList.ItemLabel>

                                                <DataList.ItemValue>
                                                    <HStack gap={2}>
                                                        <TableText>
                                                            <FormatNumber
                                                                value={parseFloat(order.additionalValue)}
                                                                style="currency"
                                                                currency="BRL"
                                                            />
                                                        </TableText>


                                                        <Stat.Root>
                                                            <Badge fontSize="xs" colorPalette="green">
                                                                <Stat.UpIndicator />
                                                                {calculoPercentualAdicional(
                                                                    order.total,
                                                                    order.additionalValue
                                                                )}
                                                                %
                                                            </Badge>
                                                        </Stat.Root>
                                                    </HStack>
                                                </DataList.ItemValue>
                                            </DataList.Item>
                                        )}

                                        {/*Deconto valor */}
                                        {Number(order.discountValue) > 0 && (
                                            <DataList.Item>
                                                <DataList.ItemLabel>
                                                    <TableLabel>Desconto valor</TableLabel>
                                                </DataList.ItemLabel>

                                                <DataList.ItemValue>
                                                    <HStack gap={2}>
                                                        <TableText>
                                                            <FormatNumber
                                                                value={parseFloat(order.additionalValue)}
                                                                style="currency"
                                                                currency="BRL"
                                                            />
                                                        </TableText>
                                                        <Stat.Root>
                                                            <Badge fontSize="xs" colorPalette="red">
                                                                <Stat.DownIndicator />
                                                                {calculoPercentualDescon(
                                                                    order.total,
                                                                    order.discountValue
                                                                )}
                                                                %
                                                            </Badge>
                                                        </Stat.Root>
                                                    </HStack>
                                                </DataList.ItemValue>
                                            </DataList.Item>
                                        )}
                                        {/*Valor total */}
                                        <DataList.Item>
                                            <DataList.ItemLabel>
                                                <TableLabel>Total</TableLabel>
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                <Badge colorPalette="blue">
                                                    <FormatNumber
                                                        value={parseFloat(order.total)}
                                                        style="currency"
                                                        currency="BRL"
                                                    />
                                                </Badge>
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    </HStack>

                                    {order.observations && (
                                        <DataList.Item>
                                            <DataList.ItemLabel>
                                                <TableLabel>Observação</TableLabel>
                                            </DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                <TableText fontSize="xs">
                                                    {order.observations}
                                                </TableText>
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    )}
                                </DataList.Root>

                                <DialogOrderItems orderItens={order.items} />
                            </Dialog.Body>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </VStack>
    )
}
