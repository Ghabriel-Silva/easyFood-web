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

import { Box, Flex, Heading, Button, Badge, FormatNumber, Stat, Text, HStack, Icon, Portal, Select, createListCollection } from "@chakra-ui/react";
import { MdAdd, MdRemoveRedEye, MdPrint } from "react-icons/md";
import getPaymentColor, { fontSizeTableBody, fontWeigthBody, getStatusOption } from "./themeOrders";
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
                  "Criado em",
                  "Cliente",
                  "Telefone",
                  "Endereço",
                  "Status",
                  "Pagamento",
                  "Total",
                  "Nota",
                  "Alterar Status"
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
                        <Badge colorPalette={'blue'} variant="subtle" >
                          <Flex
                            borderBottom="1px solid"
                            cursor="pointer"
                            textStyle={fontSizeTableBody}
                            fontWeight={fontWeigthBody}
                            gap={1}
                            align={'center'}
                            _hover={{ color: "blue.900" }}
                          >
                            <Text>
                              {"#" + (order.id.length > 4 ? order.id.slice(0, 4) : order.id)}
                            </Text>
                            <Icon>
                              <MdRemoveRedEye />
                            </Icon>
                          </Flex>
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                          {new Date(order.created_at).toLocaleString("pt-BR")}
                        </Text>
                      </TableCell>
                      <TableCell>
                        {order.customerName
                          ? (
                            <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                              {order.customerName?.trim()}
                            </Text>)
                          : (
                            <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody} color={"red"}>
                              Nome não informado
                            </Text>
                          )
                        }

                      </TableCell>
                      <TableCell>
                        <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                          {order.customerPhone}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <HStack >
                          {order.customerAddress && order.customerAddress.length > 15
                            ? (
                              <HStack>
                                <InfoTip content={order.customerAddress} />
                                <Text textStyle={fontSizeTableBody}>
                                  {order.customerAddress.slice(0, 15) + "..."}
                                </Text>
                              </HStack>
                            ) : (
                              <Text textStyle={fontSizeTableBody}>
                                {order.customerAddress}
                              </Text>
                            )}
                        </HStack>
                      </TableCell>
                      <TableCell>
                        <Badge colorPalette={color} variant="subtle" >
                          <Flex align="center" gap={1} textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                            {icon} {order.status}
                          </Flex>
                        </Badge>
                      </TableCell>
                      <TableCell >
                        <Badge variant="subtle" colorPalette={getPaymentColor(order.paymentMethod)}>
                          <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                            {order.paymentMethod
                            }
                          </Text>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Stat.Root >
                          <Stat.ValueText >
                            <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                              <FormatNumber value={parseFloat(order.total)} style="currency" currency="BRL" />
                            </Text>
                          </Stat.ValueText>
                        </Stat.Root>
                      </TableCell>
                      <TableCell>
                        <Icon _hover={{ color: "blue.900" }} cursor={"pointer"}>
                          <MdPrint />
                        </Icon>
                      </TableCell>

                      <TableCell>
                        <Select.Root
                          collection={animeMovies}
                          defaultValue={["spirited_away"]}
                          size="sm"
                          width="320px"
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select Status do Pedidos" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.ClearTrigger />
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                {animeMovies.items.map((anime) => (
                                  <Select.Item item={anime} key={anime.value}>
                                    {anime.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
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


const animeMovies = createListCollection({
  items: [
    { label: "Spirited Away", value: "spirited_away" },
    { label: "My Neighbor Totoro", value: "my_neighbor_totoro" },
    { label: "Akira", value: "akira" },
    
  ],
})