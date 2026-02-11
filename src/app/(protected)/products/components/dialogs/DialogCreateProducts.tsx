import { Button, CloseButton, Dialog, Portal, Spinner } from "@chakra-ui/react"
import { MdAdd } from "react-icons/md";
import { FormContainer } from "@/app/(protected)/products/components/index";
import { useRef } from "react";
import { UseProductsCreate } from "../../hooks/useProductsCreate";


export const DialogCreateProducts = () => {
    const { isPending } = UseProductsCreate()
    const formRef = useRef<HTMLFormElement>(null)
    return (
        <Dialog.Root closeOnInteractOutside={false} trapFocus={false}>
            <Dialog.Trigger asChild>
                <Button bg="blue.600" borderRadius="lg">Novo produto<MdAdd /></Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            {isPending && (
                                <Spinner size="md" />
                            )}

                            <Dialog.Title>Add Produto</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <FormContainer formRef={formRef} />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                onClick={() => formRef.current?.requestSubmit()}
                            >
                                Criar Produto
                            </Button>
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