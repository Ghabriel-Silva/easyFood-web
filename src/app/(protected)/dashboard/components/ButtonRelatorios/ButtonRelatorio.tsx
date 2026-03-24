import { Button,  Menu, Portal } from "@chakra-ui/react"
import { MdOutlineDescription } from "react-icons/md";
import { IconText } from "./IconText";


export const ButtonRelatorio = () => {
    const itemStyles = {
        _hover: { bg: "yellow.focusRing", color: "white", cursor: "pointer" }
    }
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
                    variant="outline"
                    borderRadius={"lg"}
                    _hover={{ bg: "yellow.focusRing", color: "white" }}
                >
                    <MdOutlineDescription
                    />
                    Exportar Relatório
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="geral" {...itemStyles}>
                            <IconText text="Resumo Geral" />
                        </Menu.Item>

                        <Menu.Item value="vendas-dia" {...itemStyles}>
                            <IconText text="Vendas por Dia - PDF" />
                        </Menu.Item>

                        <Menu.Item value="produtos"{...itemStyles}>
                            <IconText text="Desempenho de Produtos - PDF" />
                        </Menu.Item>

                        <Menu.Item value="estoque" {...itemStyles}>
                            <IconText text="Controle de Estoque - PDF" />
                        </Menu.Item>

                        <Menu.Item value="diario" {...itemStyles}>
                            <IconText text="Resumo do Dia - PDF" />
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

