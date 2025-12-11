import { MdOpenInNew, MdPrint } from "react-icons/md";
import getPaymentColor, { fontSizeTableBody, fontWeigthBody, getStatusOption } from "@/app/(protected)/orders/helpers/helpersOrders";
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
    Center
} from "@chakra-ui/react"
import { IOrder } from "../interfaces/orders-data";
import { getRandonColor } from "../helpers/helpersOrders";


interface DialogProps {
    order: IOrder
}

export const DialogOrder: React.FC<DialogProps> = ({ order }) => {

    const colorPalettes = {
        blue: "blue",
        red: "red",
        green: "green",
        pink: "pink",
        orange: "orange",
        yellow: "yellow",
        purple: "purple",
        teal: "teal",
        cyan: "cyan",
        gray: "gray",
    }

    const { color } = getStatusOption(order.status)

    return (
        <VStack alignItems="start">
            <Dialog.Root >
                <Dialog.Trigger asChild>
                    <HStack>
                        <Badge colorScheme="blue" variant="subtle">
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
                        <Badge colorScheme="blue" variant="subtle">
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
                                <DataList.Root orientation="horizontal">
                                    <DataList.Item>
                                        <DataList.ItemLabel>Cliente</DataList.ItemLabel>
                                        <DataList.ItemValue>
                                            <HStack>
                                                <Avatar.Root colorPalette={getRandonColor(colorPalettes)} size="xs">
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
                                    <DataList.Item>
                                        <DataList.ItemLabel>Frete Customizado</DataList.ItemLabel>
                                        <DataList.ItemValue> {order.customFreight} </DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>Total frete</DataList.ItemLabel>
                                        <DataList.ItemValue>{order.totalFreight} </DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>Frete Padrão Aplicado</DataList.ItemLabel>
                                        <DataList.ItemValue>
                                            {order.isFreightApplied !== undefined
                                                ? <Text>
                                                    <Badge colorPalette={'green'}>Sim</Badge>
                                                </Text>
                                                : <Text>
                                                    <Badge colorPalette={'red'}>Não</Badge>
                                                </Text>
                                            }
                                        </DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>Valor adicional</DataList.ItemLabel>
                                        <DataList.ItemValue> {order.additionalValue} </DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>Descontos</DataList.ItemLabel>
                                        <DataList.ItemValue> {order.discountValue} </DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>Total</DataList.ItemLabel>
                                        <DataList.ItemValue> {order.total} </DataList.ItemValue>
                                    </DataList.Item>
                                </DataList.Root>
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