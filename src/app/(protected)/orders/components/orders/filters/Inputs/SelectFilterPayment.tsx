import { SelectBase } from "@/app/(protected)/orders/components/ui/SelectBase"
import { createListCollection } from "@chakra-ui/react"
import { useState } from "react"


export const SelectFilterPayment = () => {
    const [pay, setPay] = useState<string>("")
    return (
        <SelectBase
            items={payment.items}
            value={pay}
            onChange={setPay}
            placeholder="Método de pagamento"
        />
    )
}

const payment = createListCollection({
    items: [
        { label: "Dinheiro ", value: "Dinheiro" },
        { label: "Cartão", value: "Cartão" },
        { label: "Pix", value: "Pix" },
        { label: "Outros", value: "Outros" }
    ],
})
