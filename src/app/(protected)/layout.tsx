"use client"

import { MenuMobile } from "@/ui/MenuMobile";
import { Box, Flex, Icon, Stack, Text, Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"
import { useState } from "react";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { usePathname } from "next/navigation"

import {
    MdShoppingCart,
    MdCategory,
    MdFastfood,
    MdSettings,
    MdDashboard,
    MdLogout,
} from "react-icons/md";

import { ColorModeButton } from "@/components/ui/color-mode"


//apenas login recebe as edições feitas aqui
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [slider, setSlider] = useState(false)

    const SIDEBAR_TRANSITION = "0.3s ease";
    const pathname = usePathname()
    return (
        <div suppressHydrationWarning  >

            {/**Layout fix mobile  */}
            <Box display={"flex"} flexDirection={{ base: 'column', md: "row" }} w="100%" height="100vh" overflow="hidden" >
                <Box display={{ base: "block", md: "none" }}>
                    <MenuMobile  >
                        {(closeMenu) => (
                            <Stack gap={6} color={"fg.muted"} >
                                {items.map((item, index) => {
                                    const isActive = pathname === item.link
                                    return (
                                        (
                                            <ChakraLink
                                                key={index}
                                                {...cleanLink}
                                                asChild
                                            >
                                                <NextLink href={item.link} onClick={closeMenu}>
                                                    <Flex
                                                        w={"100%"}
                                                        bg={isActive ? "blue.600" : "transparent"}
                                                        color={isActive ? "white" : "fg.muted"}
                                                        align="center"
                                                        gap={3}
                                                        p="2"
                                                        borderRadius="md"
                                                        cursor="pointer"
                                                        _hover={{ bg: "bg.subtle", color: "blue.400" }}
                                                    >
                                                        <Icon fontSize="xl">{item.icon}</Icon>
                                                        <Text fontSize="sm" fontWeight="medium">{item.title}</Text>
                                                    </Flex>
                                                </NextLink>
                                            </ChakraLink>
                                        )
                                    )
                                })}
                            </Stack>
                        )}
                    </MenuMobile>
                </Box>

                {/**Layout fix desktop*/}
                <Box display={{ base: "none", md: "block" }}  >
                    <Stack
                        w={slider ? "50px" : "200px"}
                        transition={`width ${SIDEBAR_TRANSITION}`}
                        height="100vh"
                        color="white"
                        p={2}
                        boxShadow="sm"
                        justify="space-between"
                    >
                        <Box>
                            <Flex
                                h="56px"
                                align="center"
                                justify="space-between"
                                px="2"
                            >
                                <Flex
                                    align="center"
                                    gap="2"
                                    overflow="hidden"
                                    opacity={slider ? 0 : 1}
                                    transform={slider ? "translateX(-12px)" : "translateX(0)"}
                                    transition="opacity 0.18s ease, transform 0.18s ease"
                                    pointerEvents={slider ? "none" : "auto"}
                                >
                                    <Text fontWeight="bold" fontSize={"xl"} color="red">
                                        EasyFood
                                    </Text>
                                </Flex>
                                <Icon
                                    cursor={"e-resize"}
                                    onClick={() => setSlider(prev => !prev)}
                                    color="fg.muted"
                                    _hover={{ color: "accent.fg" }}
                                    transition="color 0.2s ease, transform 0.3s ease"
                                    transform={slider ? "rotate(180deg)" : "rotate(0)"}
                                >
                                    <BsLayoutSidebarInset />
                                </Icon>
                            </Flex>
                            <Stack pt={6} gap={4} >
                                {items.map((item, index) => {
                                    const isActive = pathname === item.link
                                    return (
                                        <ChakraLink
                                            key={index}
                                            {...cleanLink}
                                            asChild
                                        >
                                            <NextLink href={item.link}>
                                                <Flex
                                                    align="center"
                                                    gap="3"
                                                    p="2"
                                                    borderRadius="md"
                                                    cursor="pointer"
                                                    w={slider ? "36px" : "200px"}
                                                    bg={isActive ? "blue.600" : "transparent"}
                                                    color={isActive ? "white" : "fg.muted"}
                                                    overflow="hidden"
                                                    transition={`width ${SIDEBAR_TRANSITION}, background-color 0.2s, color 0.2s`}
                                                    _hover={
                                                        !isActive
                                                            ? {
                                                                bg: "bg.subtle",
                                                                color: "blue.600",
                                                            }
                                                            : undefined
                                                    }

                                                >
                                                    <Icon fontSize="xl">{item.icon}</Icon>
                                                    <Text
                                                        fontSize="sm"
                                                        fontWeight="medium"
                                                        opacity={slider ? 0 : 1}
                                                        transition={`opacity ${SIDEBAR_TRANSITION}`}
                                                        whiteSpace="nowrap"
                                                    >
                                                        {item.title}
                                                    </Text>
                                                </Flex>
                                            </NextLink>
                                        </ChakraLink>
                                    )
                                })}
                            </Stack>
                        </Box>
                        <Flex justifyContent={"flex-start"}>
                            <ColorModeButton />
                        </Flex>
                        <Flex
                            align="center"
                            px="2"
                            py="2"
                            cursor="pointer"
                            color="fg.muted"
                            _hover={{
                                bg: "bg.subtle",
                                color: "red.400",
                            }}
                            transition="background 0.2s, color 0.2s"
                        >
                            <Icon fontSize="lg">
                                <MdLogout />
                            </Icon>
                            <Text
                                ml="3"
                                whiteSpace="nowrap"
                                opacity={slider ? 0 : 1}
                                transform={slider ? "translateX(-12px)" : "translateX(0)"}
                                transition={`opacity ${SIDEBAR_TRANSITION}, transform ${SIDEBAR_TRANSITION}`}
                            >
                                Sair
                            </Text>
                        </Flex>

                    </Stack>

                </Box>
                <Box flex="1" overflowY="auto" py={6} px={4} >
                    {children}
                </Box>
            </Box>
        </div >
    )
}
const items = [

    {
        value: "a",
        title: "Pedidos",
        text: "Criar Pedido",
        icon: <MdShoppingCart />,
        link: '/orders'
    },
    {
        value: "b",
        title: "Produtos",
        text: "Ver Produtos",
        icon: <MdFastfood />,
        link: '/products'
    },
    {
        value: "c",
        title: "Categoria",
        text: "Criar Categoria",
        icon: <MdCategory />,
        link: '/categoria'
    },

    {
        value: "d",
        title: "Dashabord",
        text: "Métricas",
        icon: <MdDashboard />,
        link: '/dashabord'
    },
    {
        value: "e",
        title: "Configurações",
        text: "Editar Config",
        icon: <MdSettings />,
        link: '/config'
    },
];

const cleanLink = {
    color: "fg.muted",
    border: "none",
    borderRadius: "sm",
    textDecoration: "none",
    _hover: { textDecoration: "none" },
    _active: { textDecoration: "none" },
    _focus: { boxShadow: "none", outline: "none" },
    _focusVisible: { boxShadow: "none", outline: "none" },
}
