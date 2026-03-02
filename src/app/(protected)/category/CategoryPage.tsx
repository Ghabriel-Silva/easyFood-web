"use client"

import { Box, Flex, Heading } from "@chakra-ui/react"
import { DialogCreateCategory, TableContainer } from "@/app/(protected)/category/components/index"

export const CategoryPage = () => {
    return (
        <Box>
            <Flex justify={"space-between"}>
                <Heading size="xl" fontWeight="medium">Categoria</Heading>
                <DialogCreateCategory />
            </Flex>
            <TableContainer />
        </Box>
    )
}