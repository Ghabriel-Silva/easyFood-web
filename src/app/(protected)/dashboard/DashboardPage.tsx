"use client"

import { Box, Flex, Heading, VStack, Text, HStack } from "@chakra-ui/react"
import { Dashboard, ButtonRelatorio, ButtonDate, NotificationsPanel } from "@/app/(protected)/dashboard/components/index"

export const DashboardPage = () => {
    const dateToday = new Date()
    const formato = { weekday: 'long', day: 'numeric', month: 'long' } as const
    let dToday = dateToday.toLocaleDateString("pt-BR", formato)

    dToday = dToday.charAt(0).toUpperCase() + dToday.slice(1)
    return (
        <Box>
            <Flex justify={{base:'center', md:"space-between", lg:"space-between"}} align={"center"} flexWrap={"wrap"} gap={15}> 
                <VStack align={{base:"center", md:"start"}}>
                    <Heading size="xl" fontWeight="bolder">Dashboard</Heading>
                    <Text fontSize={"sm"} color={"fg.muted"}>{dToday}</Text>
                </VStack>
                <HStack  flexWrap={"wrap"} justify={{base:'center', md:"space-between", lg:"space-between"}}>
                    <ButtonRelatorio />
                    <ButtonDate />
                    <NotificationsPanel />
                </HStack>
            </Flex>
            <Dashboard />
        </Box>
    )
}