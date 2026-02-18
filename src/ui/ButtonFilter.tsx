import { Button, ButtonGroup, Icon } from "@chakra-ui/react"
import { MdFilterListAlt } from "react-icons/md";


interface PropsIsLoadingButton {
    textDefault?: string,
    textLoading?: string
    isLoading?: boolean
}
export const ButtonFilter = ({
    textDefault = 'Filtrar Consulta',
    textLoading = 'Buscando dados...',
    isLoading }: PropsIsLoadingButton) => {

    return (
        <ButtonGroup colorPalette="blue" size={'sm'}>
            <Button loading={isLoading} loadingText={textLoading} type="submit">
                {textDefault}
                <Icon><MdFilterListAlt /></Icon>
            </Button>
        </ButtonGroup>
    )
}
