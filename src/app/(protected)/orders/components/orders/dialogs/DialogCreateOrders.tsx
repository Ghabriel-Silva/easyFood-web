import { Button, Dialog, CloseButton, } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { FormCreateOrders } from "@/app/(protected)/orders/components/orders/form/index";


export const CreateOrders = () => {
    return (
        <Dialog.Root size={"lg"} closeOnInteractOutside={false} >
            <Dialog.Trigger asChild>
                <Button bg="blue.600" borderRadius="lg">Novo Pedido<MdAdd /></Button>
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
                    {/*Aqui rederizo o Formulario  */}
                    <Dialog.Body>
                        <FormCreateOrders />
                    </Dialog.Body>              
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger >
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>

    )
}