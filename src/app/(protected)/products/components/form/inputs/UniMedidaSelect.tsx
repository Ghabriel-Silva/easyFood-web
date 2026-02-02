import { SelectBase } from "@/ui/index"
import { createListCollection} from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { CreateProductsInterface } from "../../../validations/create-products"

export const UniMedidaSelect = () => {
    const { control } = useFormContext<CreateProductsInterface>()
    return (  
            <Controller
                name="uni_Medida"
                control={control}
                render={({ field }) => (
                    <SelectBase
                        close={true}
                        isMultiple={false}
                        size="md"
                        items={unidadeMedida.items}
                        value={field.value ? [field.value] : []}
                        onChange={(values) => {
                            const value = values[0] ?? null
                            field.onChange(value)
                        }}
                        placeholder="Selecione Unidade Medida"
                    />
                )
                }
            />
    )

}

const unidadeMedida = createListCollection({
    items: [
        { label: "Kg", value: "kg" },
        { label: "g", value: "g" },
        { label: "l", value: "l" },
        { label: "Unidade", value: "un" },
        { label: "Porção", value: "porcao" },
        { label: "Fatia", value: "fatia" },
        { label: "Pedaço", value: "pedaco" },
        { label: "Combo", value: "combo" },
        { label: "N/A", value: "none" },
    ],
})

