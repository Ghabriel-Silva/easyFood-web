"use client"

import { Collapsible, Text, useBreakpointValue } from "@chakra-ui/react"
import { ReactNode } from "react"
import { LuChevronRight } from "react-icons/lu"
import { fontSizeTitleLabel } from "@/theme/ChakraUI/themes"

interface PropsChildren {
    children: ReactNode
    openDefault?: boolean | { sm?: boolean; md?: boolean; lg?: boolean }
    title?: string
}

export const OpcionalView = ({ children, title, openDefault }: PropsChildren) => {
    const isOpen = useBreakpointValue(
        typeof openDefault === "object"
            ? openDefault
            : {
                sm: false,
                md: openDefault,
                lg: openDefault,
            }
    )

    return (
        <Collapsible.Root width="100%" defaultOpen={isOpen}>
            <Collapsible.Trigger
                paddingY="3"
                display="flex"
                gap="2"
                alignItems="center"
            >
                <Collapsible.Indicator
                    transition="transform 0.2s"
                    _open={{ transform: "rotate(90deg)" }}
                    fontSize={fontSizeTitleLabel}
                >
                    <LuChevronRight />
                </Collapsible.Indicator>

                <Text>{title}</Text>
            </Collapsible.Trigger>

            <Collapsible.Content>{children}</Collapsible.Content>
        </Collapsible.Root>
    )
}
