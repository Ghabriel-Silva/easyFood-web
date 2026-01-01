import { Button, Dialog, CloseButton, } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { FormFather } from "@/app/(protected)/orders/components/orders/form/FormFather"





interface CreateOrdersProps {
    token: string,
}
export const ButtonCreateOrders = ({ token }: CreateOrdersProps) => {
    return (
        <Dialog.Root size={"lg"} closeOnInteractOutside={false} >
            <Dialog.Trigger asChild>
                <Button bg="blue.600" borderRadius="lg">Criar pedido novo<MdAdd /></Button>
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
                    <Dialog.Body>
                        {/*Aqui rederizo o Formulario  */}
                    <FormFather token={token} />
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger >
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>

    )
}