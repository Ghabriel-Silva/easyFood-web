import { SelectBase } from "@/app/(protected)/orders/components/ui/SelectBase"
import { createListCollection } from "@chakra-ui/react"
import { useState } from "react"


export const SelectFilterStatus = () => {
    const [statusa, setStatus] = useState<string>('')
    return (
        <SelectBase
            items={status.items}
            value={statusa}
            onChange={setStatus}
            placeholder="Método de pagamento"
        />
    )
}

const status = createListCollection({
    items: [
        { label: "Pendente ", value: "Pendente" },
        { label: "Completo", value: "Completo" },
        { label: "Entregue", value: "Entregue" },
        { label: "Cancelado", value: "Cancelado" },
        { label: "Preparando", value: "Preparando" },
    ],
})

