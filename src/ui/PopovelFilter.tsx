import {
    IconButton, Popover, PopoverCloseTrigger, Portal, HStack, CloseButton
} from "@chakra-ui/react"
import { styleIcon } from "@/app/(protected)/products/Styles/IconsStyle"
import { MdFilterAlt } from "react-icons/md";
import React, { useState } from "react"
import { TableText } from "@/ui/index";
import { ReactNode } from "react";


interface PropsPopover{
    children?:ReactNode, 
    title:string
}
export const PopovelFilter = ({children, title}:PropsPopover) => {
    const [open, setOpen] = useState(false)
    return (
        <Popover.Root
            modal={true}
            open={open} onOpenChange={(e) => setOpen(e.open)}
            positioning={{ offset: { crossAxis: 0, mainAxis: 0 } }} size={"xs"}
        >
            <Popover.Trigger asChild>
                <IconButton
                    {...styleIcon(open)}
                >
                    <MdFilterAlt />
                </IconButton>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner >
                    <Popover.Content w={"230px"} >

                        <Popover.Body>
                            <Popover.Title >
                                <HStack justifyContent={"space-between"} >
                                    <TableText>{title} </TableText>
                                    <PopoverCloseTrigger>
                                        <CloseButton asChild size="sm" rounded={"full"} />
                                    </PopoverCloseTrigger>
                                </HStack>
                            </Popover.Title>
                           {children}
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
}
