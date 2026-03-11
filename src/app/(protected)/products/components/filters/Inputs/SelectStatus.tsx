import { SelectBase } from "@/ui/index"
import { Controller, useFormContext } from "react-hook-form"
import { FilterProductsType } from "../../../validations/filter-products"
import { createListCollection} from "@chakra-ui/react"



export const SelectStatus = () => {

    const { control } = useFormContext<FilterProductsType>()
    return (   
            <Controller
                control={control}
                name="status"
                render={({ field }) => (
                    <SelectBase
                        width="100%"
                        size="xs"
                        isMultiple={false}
                        close={true}
                        placeholder="Selecione Status"
                        items={status.items}
                        value={field.value ? [field.value] : []}
                        onChange={(values) => {
                            const v = values[0] ?? null
                            field.onChange(v)
                        }}
                    />
                )}
            />     
    )
}

const status = createListCollection({
    items: [
        { label: "Ativo", value: "active" },
        { label: "Inativo", value: "desactivated" },
        { label: "Todos", value: "all" }
    ]
})