import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { MdAdd } from "react-icons/md";
import { FormContainerCategory } from "@/app/(protected)/category/components/index";
import { useRef, useState } from "react";


export const DialogCreateCategory = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [open, setOpen] = useState(false)
    return (
        <Dialog.Root
        open={open}
        onOpenChange={(e)=>setOpen(e.open)}
        >
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
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Criar Categoria</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <FormContainerCategory 
                            formRef={formRef}
                            success={()=>{
                                setOpen(false)
                            }}
                            />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                onClick={() => formRef.current?.requestSubmit()}
                            >Salvar</Button>
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
