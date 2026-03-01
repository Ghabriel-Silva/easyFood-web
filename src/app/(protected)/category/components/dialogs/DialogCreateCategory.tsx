import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { MdAdd } from "react-icons/md";


export const DialogCreateCategory = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button
                    bg="blue.600"
                    borderRadius="lg"
                >
                    Nova Categoria <MdAdd />
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>''
                        <Dialog.Header>
                            <Dialog.Title>Dialog Title</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Save</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
