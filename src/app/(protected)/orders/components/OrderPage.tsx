"use client";

import React from "react";
import { Box, Flex, Heading, Button, HStack, Spinner, Text, AbsoluteCenter, Alert} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

import TableOrders from "./TableOrders";
import { useOrdersData } from "@/app/(protected)/orders/hooks/useOrdersData";
import { useOrdersMutade } from "@/app/(protected)/orders/hooks/useOrdersMutade";
import { Toaster } from "@/components/ui/toaster";

interface OrderPageProps {
  token: string;
}

export default function OrderPage({ token }: OrderPageProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data, isLoading, isError } = useOrdersData(token);
  const { mutate: mutateStatus } = useOrdersMutade(token);

  const updateOrderStatus = (orderId: string, novoStatus: string) => mutateStatus({ orderId, novoStatus });
  
  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      {isLoading && (
        <AbsoluteCenter bg="bg/80" backdropFilter="blur(2px)" rounded="md" p="4">
          <HStack gap="3">
            <Spinner size="sm" colorScheme="blue" />
            <Text fontSize="md" color="fg.muted">Carregando...</Text>
          </HStack>
        </AbsoluteCenter>
      )}

      <Flex justify="space-between" pb={4}>
        <Heading size="xl" fontWeight="medium">Pedidos</Heading>
        <Button bg="blue.600" borderRadius="lg">Novo Pedido <MdAdd /></Button>
        <Toaster />
      </Flex>

      {!isLoading && (
        <>
          <TableOrders
            orders={data?.data ?? []}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            updateOrderStatus={updateOrderStatus}
          />

          {isError && (
            <Alert.Root status="error" w="100%">
              <Alert.Title>Erro ao carregar pedidos</Alert.Title>
              <Alert.Description>Não foi possível carregar os pedidos. Por favor, tente novamente mais tarde.</Alert.Description>
            </Alert.Root>
          )}
        </>
      )}
    </Box>
  );
}
