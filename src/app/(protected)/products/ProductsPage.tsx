"use client"

import { Box, Flex, Heading, } from "@chakra-ui/react"
import { DialogCreateProducts, TableContainer } from "@/app/(protected)/products/components/index";

export const ProductsPage = () => {
    
    return (
        <Box>
            <Flex justify="space-between"  >
                <Heading size="xl" fontWeight="medium">Produtos</Heading>
                <DialogCreateProducts />
            </Flex>
            <TableContainer  />
        </Box>
    )
}