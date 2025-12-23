import { Product } from "@/app/(protected)/orders/interfaces/porducts"
import { NumberInput, InputGroup } from "@chakra-ui/react"

interface PropsProduct {
    infoProducts: Product | null
    disabled: boolean
}


const UNIT_LABELS: Record<string, string> = {
    porcao: "Porção",
    un: "Unidade",
    fatia: "Fatia",
    pedaco: "Pedaço",
    combo: "Combo",
    none: "Qtd",
    l: "L",
    g: "g",
    kg: "Kg",
}
export const InputQuantity = ({ infoProducts, disabled}: PropsProduct) => {
    const unit = infoProducts?.uni_medida ?? 'none'
    const label = UNIT_LABELS[unit] ?? unit

    if (["porcao", "un", "fatia", "pedaco", "combo", "none"].includes(unit)) {
        return (
            <NumberInput.Root
                disabled={disabled}
                minW="120px"
                maxW="150px"
                min={0}
                max={infoProducts?.quantity ?? 50}
            >
                <NumberInput.Control />
                <InputGroup startElement={label}>
                    <NumberInput.Input ps="80px" placeholder="0" />
                </InputGroup>
            </NumberInput.Root >
        )
    }
    if (["l", "g", "kg"].includes(unit)) {
        return (
            <NumberInput.Root width="300px" min={0} max={infoProducts?.quantity ?? 50} defaultValue="0">
                <NumberInput.Control />

                <InputGroup startElement={label}>
                    <NumberInput.Input ps="60px" placeholder="0" />
                </InputGroup>
            </NumberInput.Root>
        )
    }
}
