import { Button, ButtonGroup, Icon } from "@chakra-ui/react"
import { MdFilterListAlt } from "react-icons/md";


export const ButtonFilter = () => {
    
    return (
        <ButtonGroup colorPalette="blue" size={'sm'}>
            <Button loading={false} loadingText="Buscando dados..." type="submit">
                Filtrar Consulta
                <Icon><MdFilterListAlt /></Icon>
            </Button>
        </ButtonGroup>
    )
}
