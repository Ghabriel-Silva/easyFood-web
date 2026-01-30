"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from "@mui/material";

import {
    HStack,
    Badge,
    Flex,
    Stat,
    FormatNumber,
    Box,
    Center,
    useBreakpointValue,
    Text
} from "@chakra-ui/react";

import { MdPrint } from "react-icons/md";

import { InfoTip } from "@/components/ui/toggle-tip";
import { TableText, InfoNull } from "@/ui/index";
import { SelectStatus } from "@/app/(protected)/orders/components/orders/table/index";
import { TableOrdersProps } from "@/app/(protected)/orders/interfaces/table-orders-props";
import { DialogOrder } from "@/app/(protected)/orders/components/orders/dialogs/index";
import { getStatusOption } from "@/app/(protected)/orders/helpers/index";
import { getPaymentColor } from "@/app/(protected)/orders/helpers/index";
import { fontText } from "@/theme/ChakraUI/themes";
import { MuiThemeProvider } from "@/theme/MuiDatables/providers/MuiThemeProvider";

export default function TableOrders({
    orders,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    updateOrderStatus,
}: TableOrdersProps) {
    const URL_API = process.env.NEXT_PUBLIC_URL_API;

    const isMobile = useBreakpointValue({
        base: true,
        sm: true,
        md: false,
    });

    function handleClick(orderId: string) {
        window.open(`${URL_API}/print/${orderId}`, "_blank");
    }

    const paginatedOrders = orders.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <>

            {isMobile && (
                <Box display="flex" flexDirection="column" gap={4}>
                    {paginatedOrders.map((order) => {
                        const { color, icon } = getStatusOption(order.status);

                        return (
                            <Box
                                key={order.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                p={4}
                                boxShadow="sm"
                            >
                                {/* Header */}
                                <Flex justify="space-between" align="center" mb={3}>
                                    <HStack flexWrap={"wrap"}>
                                        <DialogOrder order={order} />
                                        <Badge
                                            colorPalette="blue"
                                            variant="subtle"
                                            _hover={{ bg: "blue.200" }}
                                        >
                                            <Center cursor="pointer" w="32px">
                                                <MdPrint
                                                    size={14}
                                                    onClick={() => handleClick(order.id)}
                                                />
                                            </Center>
                                        </Badge>
                                        {/**Status pedido */}
                                        <Badge colorPalette={color} variant="subtle">
                                            <Flex align="center" gap={1}>
                                                {icon}
                                                {order.status.toUpperCase()}
                                            </Flex>
                                        </Badge>
                                    </HStack>


                                </Flex>

                               
                                <Box fontSize="sm">
                                    <Box fontSize="sm">
                                        <HStack gap={2}>
                                            <Text fontWeight="medium">Cliente:</Text>
                                            {order.customerName?.trim() || <InfoNull />}
                                        </HStack>

                                        <HStack gap={2}  >
                                            <Text fontWeight="medium">Telefone:</Text>
                                            {order.customerPhone?.trim() || <InfoNull />}
                                        </HStack>

                                        <HStack gap={2}>
                                            <Text fontWeight="medium">Endereço:</Text>
                                            {order.customerAddress?.trim() || <InfoNull />}
                                        </HStack>

                                        <Box mt={2}>
                                            <Badge
                                                variant="subtle"
                                                colorPalette={getPaymentColor(order.paymentMethod)}
                                            >
                                                {order.paymentMethod.toUpperCase()}
                                            </Badge>
                                        </Box>
                                    </Box>

                                    <Stat.Root mt={3}>
                                        <Stat.ValueText fontSize="lg">
                                            <FormatNumber
                                                value={parseFloat(order.total)}
                                                style="currency"
                                                currency="BRL"
                                            />
                                        </Stat.ValueText>
                                    </Stat.Root>
                                </Box>

                                {/* Ação */}
                                <Box mt={3}>
                                    <SelectStatus
                                        status={order.status}
                                        newStatus={(novoStatus) =>
                                            updateOrderStatus(order.id, novoStatus)
                                        }
                                    />
                                </Box>
                            </Box>
                        );
                    })}

                    <TablePagination
                        component="div"
                        count={orders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            )}


            {!isMobile && (
                <MuiThemeProvider >
                    <Paper sx={{ width: "100%", overflow: "hidden"}}>
                        <TableContainer
                            sx={{
                                maxHeight: "calc(100vh - 330px)",
                                borderRadius: "8px",
                            }}
                        >
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {[
                                            "Nº Pedido / Data",
                                            "Cliente",
                                            "Telefone",
                                            "Endereço",
                                            "Status",
                                            "Pagamento",
                                            "Total",
                                            "Alterar Status",
                                        ].map((header) => (
                                            <TableCell key={header}>{header}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedOrders.map((order) => {
                                        const { color, icon } = getStatusOption(order.status);
                                        return (
                                            <TableRow key={order.id} hover>
                                                <TableCell>
                                                    <HStack>
                                                        <DialogOrder order={order} />
                                                        <Badge
                                                            colorPalette="blue"
                                                            variant="subtle"
                                                            _hover={{ bg: "blue.200" }}
                                                        >
                                                            <Center cursor="pointer" w="32px">
                                                                <MdPrint
                                                                    size={14}
                                                                    onClick={() =>
                                                                        handleClick(order.id)
                                                                    }
                                                                />
                                                            </Center>
                                                        </Badge>
                                                    </HStack>
                                                </TableCell>
                                                <TableCell>
                                                    <HStack width="150px" gap={0}>
                                                        {!order.customerName && <InfoNull />}
                                                        {order.customerName &&
                                                            (order.customerName.length > 10 ? (
                                                                <>
                                                                    <InfoTip
                                                                        content={order.customerName}
                                                                    />
                                                                    <TableText>
                                                                        {order.customerName.slice(
                                                                            0,
                                                                            15
                                                                        )}
                                                                    </TableText>
                                                                </>
                                                            ) : (
                                                                <TableText>
                                                                    {order.customerName}
                                                                </TableText>
                                                            ))}
                                                    </HStack>
                                                </TableCell>
                                                <TableCell>
                                                    {order.customerPhone ?? <InfoNull />}
                                                </TableCell>
                                                <TableCell>
                                                    <HStack width="160px">
                                                        {!order.customerAddress && <InfoNull />}
                                                        {order.customerAddress &&
                                                            (order.customerAddress.length >
                                                                15 ? (
                                                                <>
                                                                    <InfoTip
                                                                        content={
                                                                            order.customerAddress
                                                                        }
                                                                    />
                                                                    <TableText>
                                                                        {order.customerAddress.slice(
                                                                            0,
                                                                            15
                                                                        )}
                                                                        ...
                                                                    </TableText>
                                                                </>
                                                            ) : (
                                                                <TableText>
                                                                    {order.customerAddress}
                                                                </TableText>
                                                            ))}
                                                    </HStack>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        colorPalette={color}
                                                        variant="subtle"
                                                    >
                                                        <Flex align="center" gap={1}>
                                                            {icon}
                                                            <TableText>
                                                                {order.status.toUpperCase()}
                                                            </TableText>
                                                        </Flex>
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="subtle"
                                                        colorPalette={getPaymentColor(
                                                            order.paymentMethod
                                                        )}
                                                    >
                                                        <TableText>
                                                            {order.paymentMethod.toUpperCase()}
                                                        </TableText>
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Stat.Root>
                                                        <Stat.ValueText
                                                            fontSize={fontText}
                                                        >
                                                            <TableText>
                                                                <FormatNumber
                                                                    value={parseFloat(
                                                                        order.total
                                                                    )}
                                                                    style="currency"
                                                                    currency="BRL"
                                                                />
                                                            </TableText>
                                                        </Stat.ValueText>
                                                    </Stat.Root>
                                                </TableCell>
                                                <TableCell>
                                                    <SelectStatus
                                                        status={order.status}
                                                        newStatus={(novoStatus) =>
                                                            updateOrderStatus(
                                                                order.id,
                                                                novoStatus
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            component="div"
                            count={orders.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </MuiThemeProvider>
            )}
        </>
    );
}

