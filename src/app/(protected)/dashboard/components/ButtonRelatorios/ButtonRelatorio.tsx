import { Button, Menu, Portal } from "@chakra-ui/react"
import { MdOutlineDescription } from "react-icons/md";
import { IconText } from "./IconText";

export const ButtonRelatorio = () => {
    const URL_API = process.env.NEXT_PUBLIC_URL_API;

    const itemStyles = {
        _hover: { bg: "yellow.focusRing", color: "white", cursor: "pointer" }
    }

    // Função que segue o padrão do seu handleClick da comanda
    const handleReportClick = () => {
        window.open(
            `${URL_API}/print/reports/resumo-geral?initial=2026-03-01&final=2026-03-31`,
            "_blank"
        );
    };

    return (
        // O onSelect captura o 'value' do Menu.Item clicado
        <Menu.Root onSelect={() => handleReportClick()}>
            <Menu.Trigger asChild>
                <Button
                    variant="outline"
                    borderRadius={"lg"}
                    _hover={{ bg: "yellow.focusRing", color: "white" }}
                >
                    <MdOutlineDescription />
                    Exportar Relatório
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>        
                        <Menu.Item value="resumo-geral" {...itemStyles}>
                            <IconText text="Resumo Geral" />
                        </Menu.Item>

                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

