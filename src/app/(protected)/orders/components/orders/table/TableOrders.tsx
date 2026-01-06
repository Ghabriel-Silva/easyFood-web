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
    Box
} from "@chakra-ui/react";

import { InfoTip } from "@/components/ui/toggle-tip";
import { TableText } from "@/app/(protected)/orders/components/ui/index";

import { SelectStatus } from "@/app/(protected)/orders/components/ui/index";
import { TableOrdersProps } from "@/app/(protected)/orders/interfaces/table-orders-props";
import { DialogOrder } from "@/app/(protected)/orders/components/orders/dialogs/index";
import { getStatusOption } from "@/app/(protected)/orders/helpers/index";
import { getPaymentColor } from "@/app/(protected)/orders/helpers/index";
import { fontText } from "@/themes";
import { InfoNull } from "../../ui/InfoNull";


export default function TableOrders({
    orders,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    updateOrderStatus,
}: TableOrdersProps) {
    return (
        <Paper>
            <TableContainer>
                <Table>
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
                        {orders
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order) => {
                                const { color, icon } = getStatusOption(order.status);

                                return (
                                    <TableRow key={order.id} hover>
                                        {/* Pedido / Data */}
                                        <TableCell>
                                            <DialogOrder order={order} />
                                        </TableCell>

                                        {/* Cliente */}
                                        <TableCell>
                                            <HStack width={"150px"}>
                                                {!order.customerName && <InfoNull />}

                                                {order.customerName &&
                                                    (order.customerName.length > 10 ? (
                                                        <>
                                                            <InfoTip content={order.customerName} />
                                                            <TableText>
                                                                {order.customerName.slice(0, 15)}...
                                                            </TableText>
                                                        </>
                                                    ) : (
                                                        <TableText>{order.customerName}</TableText>
                                                    ))}
                                            </HStack>
                                        </TableCell>

                                        {/* Telefone */}
                                        <TableCell>
                                            <Box>
                                                {order.customerPhone ?? <InfoNull />}
                                            </Box>
                                        </TableCell>

                                        {/* Endereço */}
                                        <TableCell>
                                            <HStack  width={"160px"}>
                                                {!order.customerAddress && <InfoNull />}

                                                {order.customerAddress &&
                                                    (order.customerAddress.length > 15 ? (
                                                        <>
                                                            <InfoTip content={order.customerAddress} />
                                                            <TableText>
                                                                {order.customerAddress.slice(0, 15)}...
                                                            </TableText>
                                                        </>
                                                    ) : (
                                                        <TableText>{order.customerAddress}</TableText>
                                                    ))}
                                            </HStack>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Badge colorPalette={color} variant="subtle">
                                                <Flex align="center" gap={1}>
                                                    {icon}
                                                    <TableText>
                                                        {order.status.toUpperCase()}
                                                    </TableText>
                                                </Flex>
                                            </Badge>
                                        </TableCell>

                                        {/* Pagamento */}
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

                                        {/* Total */}
                                        <TableCell>
                                            <Stat.Root>
                                                <Stat.ValueText fontSize={fontText}>
                                                    <TableText>
                                                        <FormatNumber
                                                            value={parseFloat(order.total)}
                                                            style="currency"
                                                            currency="BRL"
                                                        />
                                                    </TableText>
                                                </Stat.ValueText>
                                            </Stat.Root>
                                        </TableCell>

                                        {/* Alterar Status */}
                                        <TableCell>
                                            <SelectStatus
                                                status={order.status}
                                                newStatus={(novoStatus) =>
                                                    updateOrderStatus(order.id, novoStatus)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );
}
