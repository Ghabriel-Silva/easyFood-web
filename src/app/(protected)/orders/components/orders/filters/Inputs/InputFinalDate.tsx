
import { useState } from "react"
import { InputBase } from "@/app/(protected)/orders/components/ui/index"

export const InputFinalDate = () => {
    const [final, setFinal] = useState<string>("")
    return (
        <InputBase
            type="date"
            value={final}
            onChange={setFinal}
        />
    )
}