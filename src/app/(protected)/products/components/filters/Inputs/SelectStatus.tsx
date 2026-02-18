import { SelectBase } from "@/ui/index"
import { Controller, useFormContext } from "react-hook-form"
import { FilterProductsType } from "../../../validations/filter-products"
import { createListCollection, Box } from "@chakra-ui/react"



export const SelectStatus = () => {

    const { control } = useFormContext<FilterProductsType>()
    return (
        <Box>
            <Controller
                control={control}
                name="status"
                render={({ field }) => (
                    <SelectBase
                        size="sm"
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
        </Box>
    )
}

const status = createListCollection({
    items: [
        { label: "Ativo", value: "active" },
        { label: "Inativo", value: "inactive" }
    ]
})