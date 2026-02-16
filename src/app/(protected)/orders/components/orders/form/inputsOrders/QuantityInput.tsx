import { NumberInput, Input } from "@chakra-ui/react"
import { UniMedida } from "@/interfaces/type-uni-medida"

interface QuantityInputProps {
    uniMedida: UniMedida | string
    value: string
    onChange: (value: string) => void
}

export const QuantityInput = ({
    uniMedida,
    value,
    onChange,
}: QuantityInputProps) => {
    // Para peso (kg / g) → input decimal
    if (uniMedida === UniMedida.KILO || uniMedida === UniMedida.GRAMA) {
        return (
            <Input
                type="number"
                step="0.01"
                min={0.01}
                w={"100%"}
                placeholder="Ex: 0.500"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        )
    }

    // Para unidades → NumberInput
    return (
        <NumberInput.Root
            w={"100%"}
            min={1}
            max={50}
            value={value}
            onValueChange={(details) => onChange(details.value)}
        >
            <NumberInput.Control />
            <NumberInput.Input />
        </NumberInput.Root>
    )
}
