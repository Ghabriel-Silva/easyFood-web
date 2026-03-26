"use client"

import { SimpleGrid, Text, Box, HStack, Flex } from "@chakra-ui/react"
import { TextTitle } from "@/app/(protected)/dashboard/components/index"

import {
    MdCheckCircle,
    MdAccessTime,
    MdPendingActions,
    MdCancel,
    MdAttachMoney,
    MdListAlt,
} from "react-icons/md"

type TodayOrdersSummary = {
    totalMoney: string | null
    totalOrder: string
    orderCompleted: string | null
    orderPreparing: string | null
    orderPending: string | null
    orderCancelled: string | null
}

type Props = {
    summary?: TodayOrdersSummary
}

export const TodayOrdersCards = ({ summary }: Props) => {
    if (!summary) return null

    const cards = [
        {
            label: "Total de pedidos",
            value: summary.totalOrder,
            icon: MdListAlt,
            iconColor: "gray.600",
        },
        {
            label: "Concluídos",
            value: summary.orderCompleted ?? "0",
            icon: MdCheckCircle,
            iconColor: "green.500",
        },
        {
            label: "Em preparo",
            value: summary.orderPreparing ?? "0",
            icon: MdAccessTime,
            iconColor: "yellow.600",
        },
        {
            label: "Pendentes",
            value: summary.orderPending ?? "0",
            icon: MdPendingActions,
            iconColor: "orange.500",
        },
        {
            label: "Cancelados",
            value: summary.orderCancelled ?? "0",
            icon: MdCancel,
            iconColor: "red.500",
        },
        {
            label: "Total (R$)",
            value: summary.totalMoney ?? "0.00",
            icon: MdAttachMoney,
            iconColor: "teal.600",
        },
    ]

    return (
        <Box
            pt={6}
        >
            <TextTitle title="Informação Do dia"  description="Resumo dos principais indicadores do dia atual."/>
            <SimpleGrid columns={{ base: 2, sm: 3, lg: 6 }} gap={4} w={"100%"}>
                {cards.map((card) => (
                    <Box
                        key={card.label}
                        p={4}
                        borderRadius="lg"
                        boxShadow="sm"
                    >
                        <HStack justify="space-between" align="start" mb={3}>
                            <Text
                                fontSize="sm"
                                color="gray.500"
                                fontWeight="medium"
                                lineHeight="shorter"
                            >
                                {card.label}
                            </Text>
                            <Flex
                                p={2}
                                color={card.iconColor}
                                borderRadius="md"
                                align="center"
                                justify="center"
                            >
                                <card.icon size={20} />
                            </Flex>
                        </HStack>
                        <Text fontSize="2xl" fontWeight="bold" >
                            {card.value}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    )
}