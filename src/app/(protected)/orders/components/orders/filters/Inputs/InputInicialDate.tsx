import { useState } from "react"
import { InputBase } from "@/app/(protected)/orders/components/ui/index"
export const InputInicialDate = () => {
    const [date, setDate] = useState<string>("")
    return (
        <InputBase
            type="date"
            value={date}
            onChange={setDate}
        />
    )
}