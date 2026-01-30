import { Button, Dialog, CloseButton, Spinner } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { FormFather } from "@/app/(protected)/orders/components/orders/form/FormFather"
import { useOrdersCreate } from "../../../hooks/useOrdersCreate";
import { useRef, useState } from "react";


export const ButtonCreateOrders = () => {
    const [open, setOpen] = useState(false)

    const { isPending } = useOrdersCreate()
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <Dialog.Root placement={"center"} size={"lg"} closeOnInteractOutside={false} open={open} onOpenChange={(detais) => setOpen(detais.open)} >
            <Dialog.Trigger asChild>
                <Button borderRadius="lg" background={"blue.600"}>Novo pedido<MdAdd /></Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content   >
                    <Dialog.CloseTrigger />
                    <Dialog.Header>
                        {isPending && (
                            <Spinner size="md" />
                        )}
                        <Dialog.Title>
                            Add Pedido
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body >
                        {/*Aqui rederizo o Formulario  */}
                        <FormFather
                            formRef={formRef}
                            success={() => setOpen(false)}
                        />
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button colorPalette={"red"} variant={"subtle"}>Cancelar</Button>
                        </Dialog.ActionTrigger>
                        <Button
                            onClick={() => formRef.current?.requestSubmit()}
                            colorPalette={"green"}
                        >Geral Pedido</Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger >
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>

    )
}