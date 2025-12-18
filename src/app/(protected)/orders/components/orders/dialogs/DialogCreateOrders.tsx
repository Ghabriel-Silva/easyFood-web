import { Button, Dialog, CloseButton, } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { FormCreateOrders } from "@/app/(protected)/orders/components/orders/form/FormCreateOrders";

export const CreateOrders = () => {
    return (
        <Dialog.Root size={"lg"}>
            <Dialog.Trigger asChild>
                <Button  bg="blue.600" borderRadius="lg">Novo Pedido <MdAdd /></Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger />
                    <Dialog.Header>
                        <Dialog.Title>
                            Add Pedido
                        </Dialog.Title>
                    </Dialog.Header>
                    {/* Componete formulario */}
                    <Dialog.Body>
                        <FormCreateOrders />
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Button colorPalette={'green'}>Adicionar</Button>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancelar</Button>
                        </Dialog.ActionTrigger>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger >
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>

    )
}