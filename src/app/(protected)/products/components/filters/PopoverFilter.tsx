import {
    IconButton,
    Popover,
    Portal,
} from "@chakra-ui/react"
import { styleIcon } from "../../Styles/IconsStyle"
import { MdFilterAlt } from "react-icons/md";
import { FilterContainer } from "./FilterContainer";



export const PopovelFilter = () => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <IconButton
                    {...styleIcon}
                >
                    <MdFilterAlt />
                </IconButton>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Body>
                            <FilterContainer />
                        </Popover.Body>
                        <Popover.CloseTrigger />
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
}
