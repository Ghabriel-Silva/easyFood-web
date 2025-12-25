import { Product } from "@/app/(protected)/orders/interfaces/porducts"
import { NumberInput, InputGroup, Input } from "@chakra-ui/react"

interface PropsProduct {
    infoProducts: Product | null
    disabled: boolean,
    value: string
    onchangeQuantity: (value: string) => void
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
export const InputQuantity = ({ infoProducts, disabled, value, onchangeQuantity }: PropsProduct) => {
    const unit = infoProducts?.uni_medida ?? 'none'
    const label = UNIT_LABELS[unit] ?? unit

    if (["porcao", "un", "fatia", "pedaco", "combo", "none"].includes(unit)) {
        return (
            <NumberInput.Root
                clampValueOnBlur
                inputMode="numeric"
                disabled={disabled}
                minW="120px"
                maxW="150px"
                min={0}
                max={infoProducts?.quantity ?? 50}
                value={value}
                onValueChange={(e) => onchangeQuantity(e.value)}

            >
                <NumberInput.Control />
                <InputGroup startElement={label}>
                    <NumberInput.Input
                        ps="80px"
                        placeholder="0"

                    />
                </InputGroup>
            </NumberInput.Root >
        )
    }
    if (["l", "g", "kg"].includes(unit)) {
        return (
            <NumberInput.Root
                minW="120px"
                maxW="150px"

                min={0} max={infoProducts?.quantity ?? 50}
                value={value}
                onValueChange={(e) => onchangeQuantity(e.value)}
            >
                <NumberInput.Control />

                <InputGroup startElement={label} >
                    <Input
                        minW="120px"
                        maxW="150px"

                        min={0} max={infoProducts?.quantity ?? 50}
                        value={value}
                        placeholder="0,00"
                        onChange={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9.,]/g, "")
                            onchangeQuantity(e.target.value)
                        }
                        }
                    />
                </InputGroup>
            </NumberInput.Root>
        )
    }
}
