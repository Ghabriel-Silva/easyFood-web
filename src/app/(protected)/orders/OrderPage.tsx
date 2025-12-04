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

import { Box, Flex, Heading, Button, Badge, FormatNumber, Stat, Text, HStack } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import getPaymentColor, { getStatusOption } from "./themeOrders";
import { InfoTip } from "@/components/ui/toggle-tip"




type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: string;
  paymentMethod: string;
  total: string;
  totalFreight: string;
  created_at: string;
};

export default function OrderPage({ token }: { token: string }) {

  const [orders, setOrders] = React.useState<Order[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("http://localhost:8080/order/filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });

        const data = await res.json();
        if (Array.isArray(data.data)) {
          setOrders(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadOrders();
  }, [token]);

  // handlers da paginação
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box >
      <Flex justify={"space-between"} pb={4}>
        <Heading size="xl" fontWeight={"medium"} >Pedidos</Heading>
        <Button bg={"blue.600"} borderRadius={"lg"} >Novo Pedido< MdAdd /></Button>
      </Flex>
      <Paper>
        <TableContainer
          sx={{ maxHeight: "auto" }}
        >
          <Table   >
            <TableHead>
              <TableRow >
                {[
                  "Pedido",
                  "Cliente",
                  "Telefone",
                  "Endereço",
                  "Status",
                  "Pagamento",
                  "Total",
                  "Frete",
                  "Criado em",
                ].map((header) => (
                  <TableCell
                    key={header}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => {
                  const { color, icon } = getStatusOption(order.status)

                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Badge size={'lg'} colorPalette={'blue'} variant="plain" >
                          <Text
                            borderBottom="1px solid"
                            borderColor="blue.500"
                            display="inline-block"
                            cursor="pointer"
                          >
                            {"#" + (order.id.length > 6 ? order.id.slice(0, 4) : order.id)}
                          </Text>
                        </Badge>
                      </TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.customerPhone}</TableCell>
                      <TableCell>
                        <HStack justify="center">
                          {order.customerAddress && order.customerAddress.length > 15
                            ? (
                              <HStack>
                                <InfoTip content={order.customerAddress} />
                                <Text textStyle="xs">
                                  {order.customerAddress.slice(0, 15) + "..."}
                                </Text>
                              </HStack>
                            ) : (
                              <Text textStyle="sm">
                                {order.customerAddress}
                              </Text>
                            )}

                        </HStack>
                      </TableCell>
                      <TableCell>
                        <Badge colorPalette={color}  variant="subtle" >
                          <Flex align="center" gap={1}>
                            {icon} {order.status}
                          </Flex>
                        </Badge>
                      </TableCell>
                      <TableCell >
                        <Badge variant="subtle" colorPalette={getPaymentColor(order.paymentMethod)}>
                          {order.paymentMethod}
                          </Badge>
                      </TableCell>
                      <TableCell>
                        <Stat.Root size={"sm"}>
                          <Stat.ValueText asChild >
                            <FormatNumber value={parseFloat(order.total)} style="currency" currency="BRL" />
                          </Stat.ValueText>
                        </Stat.Root>
                      </TableCell>
                      <TableCell>
                        <Stat.Root size={"sm"}>
                          <Stat.ValueText asChild >
                            <FormatNumber value={parseFloat(order.totalFreight)} style="currency" currency="BRL" />
                          </Stat.ValueText>
                        </Stat.Root>
                      </TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleString("pt-BR")}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {/* Paginação */}
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
    </Box>
  );
}
