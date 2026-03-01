import {
    IconButton, Popover, PopoverCloseTrigger, Portal, HStack, CloseButton} from "@chakra-ui/react"
import { styleIcon } from "../../Styles/IconsStyle"
import { MdFilterAlt } from "react-icons/md";
import { FilterContainer } from "./FilterContainer";
import { useState } from "react"
import { TableText } from "@/ui/index";



export const PopovelFilter = () => {
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
                                    <TableText>Filtrar Produtos</TableText>
                                    <PopoverCloseTrigger>                                    
                                            <CloseButton asChild size="sm" rounded={"full"}/>                                    
                                    </PopoverCloseTrigger>
                                </HStack>
                            </Popover.Title>
                            <FilterContainer />
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
}
