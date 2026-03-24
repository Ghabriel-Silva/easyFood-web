import { Button, Icon, Menu, Portal } from "@chakra-ui/react"
import { MdOutlineCalendarToday } from "react-icons/md";
import { DataInput } from "@/app/(protected)/dashboard/components/index";


export const ButtonDate = () => {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
                    variant="outline"
                    borderRadius={"lg"}
                    _hover={{ bg: "yellow.focusRing", color: "white" }}
                >
                    <Icon>
                        < MdOutlineCalendarToday />
                    </Icon>
                    Personalizado
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <DataInput />
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}