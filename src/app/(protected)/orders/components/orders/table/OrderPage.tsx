"use client";

import React from "react";
import { Box, Flex, Heading, HStack, Spinner, Text, AbsoluteCenter, Alert } from "@chakra-ui/react";

import { TableOrders } from "@/app/(protected)/orders/components/orders/table/index";
import { useOrdersData } from "@/app/(protected)/orders/hooks/index";
import { useOrdersMutade } from "@/app/(protected)/orders/hooks/index";
import { Toaster } from "@/components/ui/toaster";
import { ButtonCreateOrders } from "@/app/(protected)/orders/components/orders/dialogs/DialogCreateOrdersButton";
import { FilterContainer } from "@/app/(protected)/orders/components/orders/filters/FilterContainer";
import { OpcionalView } from "@/app/(protected)/orders/components/ui/index";



export default function OrderPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data, isLoading, isError } = useOrdersData();
  const { mutate: mutateStatus } = useOrdersMutade();

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

          <Flex justify="space-between"  >
            <Heading size="xl" fontWeight="medium">Pedidos</Heading>
            <ButtonCreateOrders />
            <Toaster />
          </Flex>
          <OpcionalView title="Filtrar Pedidos">
            <FilterContainer />
          </OpcionalView>

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
