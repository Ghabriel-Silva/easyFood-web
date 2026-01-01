import { handleNumber } from "@/app/(protected)/orders/helpers/handleNumber"
import { Product } from "@/app/(protected)/orders/interfaces/porducts"
import { NumberInput, InputGroup, Input } from "@chakra-ui/react"
import { useFormContext, Controller } from "react-hook-form"


interface PropsProduct {
    infoProducts: Product | null
    disabled: boolean,
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
export const InputQuantity = ({ infoProducts, disabled }: PropsProduct) => {
    const unit = infoProducts?.uni_medida ?? "none"
    const label = UNIT_LABELS[unit] ?? unit
    const { control } = useFormContext()

    const isIntegerUnit = ["porcao", "un", "fatia", "pedaco", "combo", "none"].includes(unit)
    const isDecimalUnit = ["l", "g", "kg"].includes(unit)

    if (isIntegerUnit) {
        return (
            <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                    <NumberInput.Root
                        clampValueOnBlur
                        inputMode="numeric"
                        min={0}
                        max={infoProducts?.quantity ?? 50}
                        value={field.value}
                        onValueChange={(e) => field.onChange(e.value)}
                        disabled={disabled}
                    >
                        <NumberInput.Control />
                        <InputGroup startElement={label}>
                            <NumberInput.Input ps="80px" placeholder="0" />
                        </InputGroup>
                    </NumberInput.Root>
                )}
            />
        )
    }

    if (isDecimalUnit) {
        return (
            <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                    <InputGroup startElement={label}>
                        <Input
                            type="text"
                            inputMode="decimal"
                            placeholder="0.000"
                            disabled={disabled}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(handleNumber(e))}
                        />
                    </InputGroup>
                )}
            />
        )
    }

    return <></>
}
