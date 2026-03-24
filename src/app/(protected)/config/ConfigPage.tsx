"use client";

import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import { ConfigContainer } from "@/app/(protected)/config/components/index"


export const ConfigPage = () => {

    return (
        <Box >
            <Flex justify={"space-between"} align={"center"} mb={"20px"}>
                <VStack align={"flex-start"}>
                    <Heading size="xl" fontWeight="medium">Configurações Gerais</Heading>
                </VStack>
            </Flex>

            <ConfigContainer />
        </Box>
    )
}