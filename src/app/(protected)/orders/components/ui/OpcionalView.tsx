"use client"

import { Collapsible, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { LuChevronRight } from "react-icons/lu"
import { fontSizeTitleLabel } from "@/themes"

interface PropsChildren {
    children: ReactNode
    title?: string,
}

export const OpcionalView = ({ children, title }: PropsChildren) => {
    return (
        <Collapsible.Root width="100%" >
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
            <Collapsible.Content>
                {children}
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
