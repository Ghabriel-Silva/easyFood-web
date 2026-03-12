"use client";

import { ColorLabel, fontText } from "@/theme/ChakraUI/themes";
import { Box, Flex, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { ConfigContainer} from "@/app/(protected)/config/components/index"

export const ConfigPage = () => {
    return (
        <Box >
            <Flex justify={"space-between"} align={"center"} mb={"20px"}>
                <VStack align={"flex-start"}>
                    <Heading size="xl" fontWeight="medium">Configurações Gerais</Heading>
                </VStack>
                <Button
                    bg="blue.600"
                    borderRadius="lg"
                >
                    Salvar Alterações
                </Button> 
            </Flex>

            <ConfigContainer />
        </Box>
    )
}