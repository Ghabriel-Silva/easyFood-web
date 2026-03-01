"use client";

import React, { useState } from "react";
import { Box, Flex, Heading} from "@chakra-ui/react";

import { TableOrders } from "@/app/(protected)/orders/components/orders/table/index";
import { useOrdersData } from "@/app/(protected)/orders/hooks/index";
import { useOrdersMutade } from "@/app/(protected)/orders/hooks/index";
import { Toaster } from "@/components/ui/toaster";
import { ButtonCreateOrders } from "@/app/(protected)/orders/components/orders/dialogs/DialogCreateOrdersButton";
import { FilterContainer } from "@/app/(protected)/orders/components/orders/filters/FilterContainer";
import { FullScreenLoading, OpcionalView, StatEmpaty } from "@/ui/index";
import { FilterOrderSchemaInterface } from "../../../validations/filter-orders";



export default function OrderPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const [filters, setFilter] = useState<FilterOrderSchemaInterface>({})

  const { data, isLoading, isError } = useOrdersData(filters);

  const { mutate: mutateStatus } = useOrdersMutade();
  console.log(data)

  const updateOrderStatus = (orderId: string, novoStatus: string) => mutateStatus({ orderId, novoStatus });

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box  height={"100%"}>
      <Flex justify="space-between"  >
        <Heading size="xl" fontWeight="medium">Pedidos</Heading>
        <ButtonCreateOrders />
        <Toaster />
      </Flex>
      <OpcionalView title="Filtrar Pedidos" openDefault={true} >
        <FilterContainer
          onFilterChange={setFilter}
          isLoadingButton={isLoading}
          isErrorResetField={isError} />
      </OpcionalView>

      {isLoading && (
        <FullScreenLoading />
      )}


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

          {Array.isArray(data?.data) && data.data.length === 0 && (
            <StatEmpaty title={'Resultado não encontrado'} description={'Nenhum produto encontrado, para esse Filtro'} />
          )}
        </>
      )}
    </Box>
  );
}
