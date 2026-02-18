import { SelectBase } from "@/ui"
import { createListCollection,Box } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { FilterProductsType } from "../../../validations/filter-products"

export const SelectPrice = () => {

    const { control } = useFormContext<FilterProductsType>()
    return (
        <Box w={"100px"}> 
            <Controller
                name="price"
                control={control}
                render={({ field }) => (
                    <SelectBase
                        items={price.items}
                        isMultiple={false}
                        close={true}
                        size="sm"
                        value={field.value ? [field.value] : []}
                        onChange={(values) => {
                            const value = values[0] ?? null
                            field.onChange(value)
                        }}
                        placeholder="Selecione Preço"
                    />
                )}
            />
        </Box>

    )
}

const price = createListCollection({
    items: [
        { label: "Maior", value: "maior" },
        { label: "Menor", value: "menor" },

    ]
})