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

import { HStack, Badge, Flex, Text, Stat, FormatNumber } from "@chakra-ui/react";
import getPaymentColor, { fontSizeTableBody, fontWeigthBody, getStatusOption } from "@/app/(protected)/orders/helpers/helpersOrders";
import { InfoTip } from "@/components/ui/toggle-tip";
import SelectStatus from "./SelectStatus";
import { TableOrdersProps } from "../interfaces/table-orders-props";
import { DialogOrder } from "./DialogOrder";


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
            <TableContainer sx={{ maxHeight: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["Nº Pedido /Data", "Cliente", "Telefone", "Endereço", "Status", "Pagamento", "Total", "Alterar Status"].map(header => (
                                <TableCell key={header}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => {
                            const { color, icon } = getStatusOption(order.status);
                            return (
                                <TableRow key={order.id} hover>
                                    {/* Pedido / Data / rederiza diolog */}
                                    <TableCell>
                                        <DialogOrder order={order} />
                                    </TableCell>

                                    {/* Cliente */}
                                    <TableCell>
                                        {order.customerName ? (
                                            <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>{order.customerName.trim()}</Text>
                                        ) : (
                                            <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody} color="red">Nome não informado</Text>
                                        )}
                                    </TableCell>

                                    {/* Telefone */}
                                    <TableCell>
                                        <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>{order.customerPhone}</Text>
                                    </TableCell>

                                    {/* Endereço */}
                                    <TableCell>
                                        <HStack>
                                            {order.customerAddress && order.customerAddress.length > 15 ? (
                                                <HStack>
                                                    <InfoTip content={order.customerAddress} />
                                                    <Text textStyle={fontSizeTableBody}>{order.customerAddress.slice(0, 15) + "..."}</Text>
                                                </HStack>
                                            ) : (
                                                <Text textStyle={fontSizeTableBody}>{order.customerAddress}</Text>
                                            )}
                                        </HStack>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <Badge colorPalette={color} variant="subtle">
                                            <Flex align="center" gap={1} textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                                                {icon} {order.status.toUpperCase()}
                                            </Flex>
                                        </Badge>
                                    </TableCell>

                                    {/* Pagamento */}
                                    <TableCell>
                                        <Badge variant="subtle" colorPalette={getPaymentColor(order.paymentMethod)}>
                                            <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>{order.paymentMethod.toUpperCase()}</Text>
                                        </Badge>
                                    </TableCell>

                                    {/* Total */}
                                    <TableCell>
                                        <Stat.Root>
                                            <Stat.ValueText>
                                                <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                                                    <FormatNumber value={parseFloat(order.total)} style="currency" currency="BRL" />
                                                </Text>
                                            </Stat.ValueText>
                                        </Stat.Root>
                                    </TableCell>

                                    {/* Alterar Status */}
                                    <TableCell>
                                        <SelectStatus status={order.status} newStatus={(novoStatus) => updateOrderStatus(order.id, novoStatus)} />
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
