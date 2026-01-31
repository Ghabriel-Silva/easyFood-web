import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { MdAdd } from "react-icons/md";
import { FormContainer } from "@/app/(protected)/products/components/index";


export const DialogCreateProducts = () => {
    return (
        <Dialog.Root  closeOnInteractOutside={false}>
            <Dialog.Trigger asChild>
                <Button bg="blue.600" borderRadius="lg">Novo produto<MdAdd /></Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Add Produto</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <FormContainer />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button>Criar Produto</Button>
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