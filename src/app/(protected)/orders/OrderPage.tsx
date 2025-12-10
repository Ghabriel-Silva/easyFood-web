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

import { Box, Flex, Heading, Button, Badge, FormatNumber, Stat, Text, HStack, Icon, Center, AbsoluteCenter, Spinner, Alert } from "@chakra-ui/react";
import { MdAdd, MdPrint, MdOpenInNew } from "react-icons/md";
import getPaymentColor, { fontSizeTableBody, fontWeigthBody, getStatusOption } from "./themeOrders";
import { InfoTip } from "@/components/ui/toggle-tip"
import SelectStatus from "./SelectStatus";
import { useOrdersData } from "@/hooks/useOrdersData";
import { IOrder } from "@/interfaces/orders-data";





export default function OrderPage({ token }: { token: string }) {


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const { data, isLoading, isError } = useOrdersData(token)



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



  const updateOrderStatus = (orderId: string, novoStatus: string) => {
    console.log(`Pedido ${orderId} atualizado para ${novoStatus}`);
    // Aqui você pode chamar API para atualizar no banco
  };



  //chamda de erro para tosterr


  return (
    <Box >
      {isLoading &&
        <AbsoluteCenter bg="bg/80" backdropFilter="blur(2px)" rounded="md" p="4">
          <HStack gap="3">
            <Spinner size="sm" colorPalette="blue" />
            <Text fontSize="md" color="fg.muted">
              Carregado...
            </Text>
          </HStack>
        </AbsoluteCenter>
      }

      <Flex justify={"space-between"} pb={4}>
        <Heading size="xl" fontWeight={"medium"} >Pedidos</Heading>
        <Button bg={"blue.600"} borderRadius={"lg"} >Novo Pedido< MdAdd /></Button>
      </Flex>
      {!isLoading && <>
        <Paper>
          <TableContainer
            sx={{ maxHeight: "auto" }}

          >
            <Table   >
              <TableHead>
                <TableRow >
                  {[
                    "Nº Pedido /Data",
                    "Cliente",
                    "Telefone",
                    "Endereço",
                    "Status",
                    "Pagamento",
                    "Total",
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
                {(data?.data ?? [])
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order: IOrder) => {
                    const { color, icon } = getStatusOption(order.status)
                    return (
                      <TableRow key={order.id} hover>
                        <TableCell>
                          <HStack>
                            <Badge colorPalette={'blue'} variant="subtle" >
                              <Flex

                                cursor="pointer"
                                textStyle={fontSizeTableBody}
                                fontWeight={fontWeigthBody}
                                align={'center'}
                                gap={1}
                                _hover={{
                                  color: "blue.900",
                                  borderBottom: "1px solid"
                                }}
                              >
                                <HStack gap={0}>
                                  <Icon>
                                    <MdOpenInNew />
                                  </Icon>
                                  <Text>
                                    {(order.id.length > 4 ? order.id.slice(0, 4) : order.id) + ` - `}
                                  </Text>
                                </HStack>
                                <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                                  {new Date(order.created_at).toLocaleString("pt-BR").split("-")}
                                </Text>
                              </Flex>
                            </Badge>
                            <Badge colorPalette={'blue'} variant="subtle" >
                              <Center _hover={{ color: "blue.900" }} cursor={"pointer"} w={"40px"}>
                                <MdPrint />
                              </Center>
                            </Badge>
                          </HStack>
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
                              {icon} {order.status.toUpperCase()}
                            </Flex>
                          </Badge>
                        </TableCell>
                        <TableCell >
                          <Badge variant="subtle" colorPalette={getPaymentColor(order.paymentMethod)}>
                            <Text textStyle={fontSizeTableBody} fontWeight={fontWeigthBody}>
                              {order.paymentMethod.toUpperCase()}
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
                          <SelectStatus
                            status={order.status}
                            newStatus={(novoStatus) => updateOrderStatus(order.id, novoStatus)}
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
              count={data?.data.length ?? 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
        {isError && (
          <Alert.Root status="error" w={"100%"}>
            <Alert.Indicator/>
            <Alert.Content>
              <Alert.Title >Erro ao carregar pedidos</Alert.Title>
              <Alert.Description >
                Não foi possível carregar os pedidos. Por favor, tente novamente mais tarde.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
      </>}
    </Box >
  );
}


