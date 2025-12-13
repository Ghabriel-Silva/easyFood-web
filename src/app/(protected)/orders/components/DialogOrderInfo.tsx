import { MdOpenInNew, MdPrint } from "react-icons/md";

import {
    Avatar,
    Flex,
    Badge,
    Text,
    Icon,
    CloseButton,
    DataList,
    Dialog,
    HStack,
    Portal,
    VStack,
    Center,
    FormatNumber,
    Stat
} from "@chakra-ui/react"
import { IOrder } from "../interfaces/orders-data";
import { fontSizeTableBody, fontWeigthBody, getRandonColor } from "../helpers/themes"
import { getStatusOption } from "../helpers/status";
import getPaymentColor from "../helpers/payment";
import { calculoPercentualAdicional } from "../helpers/percent";
import { DialogOrderItems } from "./DialogOrderItems";


interface DialogProps {
    order: IOrder
}

export const DialogOrder: React.FC<DialogProps> = ({ order }) => {

    const { color } = getStatusOption(order.status)

    return (
        <VStack alignItems="start">
            <Dialog.Root  >
                <Dialog.Trigger asChild >
                    <HStack>
                        <Badge colorPalette="blue" variant="subtle">
                            <Flex cursor="pointer" textStyle={fontSizeTableBody} fontWeight={fontWeigthBody} align="center" gap={1} _hover={{ color: "blue.900", borderBottom: "1px solid" }}>
                                <HStack gap={0}>
                                    <Icon><MdOpenInNew /></Icon>
                                    <Text>{(order.id.length > 4 ? order.id.slice(0, 4) : order.id) + " - "}</Text>
                                </HStack>
                                <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                                    {new Date(order.created_at).toLocaleString("pt-BR").replace(',', ' - ')}
                                </Text>
                            </Flex>
                        </Badge>
                        <Badge colorPalette="blue" variant="subtle">
                            <Center _hover={{ color: "blue.900" }} cursor="pointer" w="40px">
                                <MdPrint />
                            </Center>
                        </Badge>
                    </HStack>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Pedido {order.id.slice(0, 4)} </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body pb="8">
                                <DataList.Root orientation="vertical">
                                    <HStack gap={8} wrap={"wrap"}>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Cliente</DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                <HStack>
                                                    <Avatar.Root colorPalette={getRandonColor()} size="xs">
                                                        <Avatar.Fallback name={order?.customerName || 'Nome não informado'} />
                                                    </Avatar.Root>
                                                    {order?.customerName || 'Nome não informado'}
                                                </HStack>
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Status</DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                <Badge colorPalette={color}>{order.status} </Badge>
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Data/Hora</DataList.ItemLabel>
                                            <DataList.ItemValue> {new Date(order.created_at).toLocaleString("pt-BR").replace(',', ' - ')}</DataList.ItemValue>
                                        </DataList.Item>
                                    </HStack>
                                    <HStack gap={8} wrap={"wrap"}>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Endereço</DataList.ItemLabel>
                                            <DataList.ItemValue> {order.customerAddress} </DataList.ItemValue>
                                        </DataList.Item>

                                        <DataList.Item>
                                            <DataList.ItemLabel>Telefone</DataList.ItemLabel>
                                            <DataList.ItemValue> {order.customerPhone} </DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Pagamento</DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                <Badge colorPalette={getPaymentColor(order.paymentMethod)}>{order.paymentMethod}</Badge>
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    </HStack>
                                    <HStack gap={8} wrap={"wrap"}>
                                        {Number(order.customFreight) > 0 && (
                                            <DataList.Item>
                                                <DataList.ItemLabel>Frete Customizado</DataList.ItemLabel>
                                                <DataList.ItemValue>
                                                    <FormatNumber value={parseFloat(order.customFreight)} style="currency" currency="BRL" />
                                                </DataList.ItemValue>
                                            </DataList.Item>
                                        )}
                                        {Number(order.totalFreight) > 0 && (
                                            <DataList.Item>
                                                <DataList.ItemLabel>Total frete</DataList.ItemLabel>
                                                <DataList.ItemValue>
                                                    <FormatNumber value={parseFloat(order.totalFreight)} style="currency" currency="BRL" />
                                                </DataList.ItemValue>
                                            </DataList.Item>
                                        )}
                                        <DataList.Item>
                                            <DataList.ItemLabel>Frete Padrão Aplicado</DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                {order.isFreightApplied
                                                    ? <Text>
                                                        <Badge colorPalette={'green'}>Sim</Badge>
                                                    </Text>
                                                    : <Text>
                                                        <Badge colorPalette={'red'}>Não</Badge>
                                                    </Text>
                                                }
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    </HStack>
                                    <HStack gap={8} wrap={"wrap"}>
                                        {Number(order.additionalValue) > 0 && (
                                            <DataList.Item>
                                                <DataList.ItemLabel>Valor adicional</DataList.ItemLabel>
                                                <DataList.ItemValue>
                                                    <Stat.Root>
                                                        <HStack>
                                                            <Stat.ValueText fontSize={"sm"} fontWeight={'normal'}>
                                                                <FormatNumber value={parseFloat(order.additionalValue)} style="currency" currency="BRL" />
                                                            </Stat.ValueText>
                                                            <Badge colorPalette="green" gap="0" fontSize={fontSizeTableBody}>
                                                                <Stat.UpIndicator />
                                                                {calculoPercentualAdicional(order.total, order.additionalValue) + '%'}
                                                            </Badge>
                                                        </HStack>
                                                    </Stat.Root>
                                                </DataList.ItemValue>
                                            </DataList.Item>
                                        )}
                                        {Number(order.discountValue) > 0 && (
                                            <DataList.Item>
                                                <DataList.ItemLabel>Descontos</DataList.ItemLabel>
                                                <DataList.ItemValue>
                                                    <Stat.Root>
                                                        <HStack>
                                                            <Stat.ValueText fontSize={"sm"} fontWeight={'normal'}>
                                                                <FormatNumber value={parseFloat(order.discountValue)} style="currency" currency="BRL" />
                                                            </Stat.ValueText>
                                                            <Badge colorPalette="red" gap="0">
                                                                <Stat.DownIndicator />
                                                                {calculoPercentualAdicional(order.total, order.discountValue) + '%'}
                                                            </Badge>
                                                        </HStack>
                                                    </Stat.Root>
                                                </DataList.ItemValue>
                                            </DataList.Item>
                                        )}
                                        <DataList.Item>
                                            <DataList.ItemLabel>Total</DataList.ItemLabel>
                                            <DataList.ItemValue >
                                                <Badge colorPalette="blue">
                                                    <FormatNumber value={parseFloat(order.total)} style="currency" currency="BRL" />
                                                </Badge>
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                    </HStack>
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