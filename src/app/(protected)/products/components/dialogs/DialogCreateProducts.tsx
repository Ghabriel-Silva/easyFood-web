import { Button, CloseButton, Dialog, Portal, Spinner } from "@chakra-ui/react"
import { MdAdd } from "react-icons/md";
import { FormContainer } from "@/app/(protected)/products/components/index";
import { useEffect, useRef, useState } from "react";
import { UseProductsCreate } from "../../hooks/useProductsCreate";
import { useEditeProduct } from "@/stores/editeProductStore";


export const DialogCreateProducts = () => {
    const { isPending } = UseProductsCreate()

    const isEditeP = useEditeProduct((s) => s.IsEdite) //Ao clicar no Edite recebo true
    const setEdite = useEditeProduct((s) => s.setEdite)
    const setProduct = useEditeProduct((s) => s.setProduct)

    const [open, setOpen] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    // Abre quando entra em modo edição
    useEffect(() => {
        if (isEditeP) setOpen(true) //Se click no botão editar o estado setOpen é true 
    }, [isEditeP])


    return (
        <Dialog.Root
            closeOnInteractOutside={false}
            open={open}
            onOpenChange={(details) => { // details objeto que sabe se o dialog esta aberto ou fechado
                setOpen(details.open) //aqui digo que o estado do componente             
                if (!details.open) setEdite(false)
                setProduct(null) //quando fechar o modal quero que ele seja null
            }}
        >
            <Dialog.Trigger asChild>

                <Button
                    bg="blue.600"
                    borderRadius="lg"
                    onClick={() => setEdite(false)}
                >
                    Novo produto <MdAdd />
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            {isPending && <Spinner size="lg" />}

                            <Dialog.Title>
                                {isEditeP ? "Editar Produto" : "Novo Produto"}
                            </Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <FormContainer
                                formRef={formRef}
                                success={() => {
                                    setOpen(false)
                                    setEdite(false)
                                }}
                            />
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancelar</Button>
                            </Dialog.ActionTrigger>

                            <Button
                                onClick={() => formRef.current?.requestSubmit()}
                            >
                                {isEditeP ? "Salvar" : "Criar Produto"}
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