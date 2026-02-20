import { SelectBase } from "@/ui"
import { createListCollection } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { FilterProductsType } from "../../../validations/filter-products"

export const SelectPrice = () => {

    const { control } = useFormContext<FilterProductsType>()
    return (
            <Controller
                name="price"
                control={control}
                render={({ field }) => (
                    <SelectBase
                        width="100%"
                        size="xs"
                        items={price.items}
                        isMultiple={false}
                        close={true}
                        value={field.value ? [field.value] : []}
                        onChange={(values) => {
                            const value = values[0] ?? null
                            field.onChange(value)
                        }}
                        placeholder="Selecione Preço"
                    />
                )}
            />
    )
}

const price = createListCollection({
    items: [
        { label: "Maior", value: "maior" },
        { label: "Menor", value: "menor" },

    ]
})