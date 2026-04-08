import {
    Button,
    Popover,
    Portal,
    Box,
    Text,
    Badge,
    VStack,
    HStack,

} from "@chakra-ui/react"
import { FaBell } from "react-icons/fa"
import { useNotifications } from "../../hooks/useNotifications"
import { useState } from "react"

const colorMap = {
    stock: "red.500",
    expiry: "orange.400",
    insight: "green.400",
    system: "blue.400",
}

function timeAgo(date: string) {

    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 60000)

    if (diff < 1) return "agora"
    if (diff < 60) return `${diff} min atrás`
    if (diff < 1440) return `${Math.floor(diff / 60)}h atrás`

    return `${Math.floor(diff / 1440)}d atrás`
}

export const NotificationsPanel = () => {
    const [showAll, setShowAll] = useState(false)
    const { notifications, isPending } = useNotifications()

    return (
        <Popover.Root
            positioning={{ placement: "bottom-end" }}
            onOpenChange={() => {
                setShowAll(false)
            }}
        >
            <Popover.Trigger asChild>
                <Button size="sm" variant="outline" position="relative">
                    <FaBell />

                    {notifications.length > 0 && (
                        <Badge
                            position="absolute"
                            top="-4px"
                            right="-4px"
                            borderRadius="full"
                            colorPalette="pink"
                        >
                            {notifications.length}
                        </Badge>
                    )}
                </Button>
            </Popover.Trigger>

            <Portal>
                <Popover.Positioner>
                    <Popover.Content p={0}>
                        <Box p={3} borderBottomWidth="1px">
                            <HStack justify="space-between">
                                <HStack>
                                    <FaBell />
                                    <Text fontWeight="medium">Notificações</Text>
                                    {notifications.length > 0 && (
                                        <Badge colorPalette="pink">
                                            TOTAL {notifications.length}
                                        </Badge>
                                    )}
                                </HStack>
                            </HStack>
                        </Box>

                        <Box maxH={showAll ? "500px" : "300px"}
                            overflowY={showAll ? "auto" : "hidden"}>
                            {isPending && <Text p={3}>Carregando...</Text>}

                            {!isPending && notifications.length === 0 && (
                                <Text p={3}>Nenhuma notificação </Text>
                            )}

                            <VStack align="stretch" gap={0}>
                                {notifications.map((item) => (
                                    <Box
                                        key={item.id}
                                        p={3}
                                        _hover={{ bg: "bg.muted" }}
                                    >
                                        <HStack align="start" gap={3}>
                                            <Box
                                                w="8px"
                                                h="8px"
                                                bg={colorMap[item.category]}
                                                borderRadius="full"
                                                mt="6px"
                                            />

                                            <Box>
                                                <Text fontWeight="semibold">
                                                    {item.title}
                                                </Text>
                                                <Text fontSize="sm" color="gray.500">
                                                    {item.description}
                                                </Text>

                                                <Text fontSize="xs" color="gray.400">
                                                    {timeAgo(item.createdAt)}
                                                </Text>
                                            </Box>
                                        </HStack>
                                    </Box>
                                ))}
                            </VStack>
                        </Box>

                        <Box p={3} textAlign="center">
                            <Text
                                fontSize="sm"
                                color="blue.500"
                                cursor="pointer"
                                onClick={() => setShowAll((prev) => !prev)}
                            >
                                {notifications.length === 0 ? '' : showAll ? "Mostrar menos" : "Ver todas notificações"}
                            </Text>
                        </Box>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
}