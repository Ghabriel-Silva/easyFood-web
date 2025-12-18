"use client"

import { Collapsible, HStack , Text} from "@chakra-ui/react"
import { ReactNode } from "react"
import { LuChevronRight } from "react-icons/lu"
import { fontSizeTitleLabel } from "@/themes"

interface PropsChildren {
    children: ReactNode
}

export const FormFieldOptional = ({ children }: PropsChildren) => {
    return (
        <Collapsible.Root  width="100%">
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
                <Text>Info adicionais</Text>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <HStack   flexWrap="wrap">
                    {children}
                </HStack>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
