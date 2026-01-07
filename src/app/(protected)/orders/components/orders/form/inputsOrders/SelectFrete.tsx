
import { OrderFormSchemaInterface } from "@/app/(protected)/orders/validations/orders-form"
import { createListCollection, Select } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"

export const SelectFrete = () => {
    const { control } = useFormContext<OrderFormSchemaInterface>()
    return (

        <Controller
            name="isFreightApplied"
            control={control}
            render={({ field }) => (
                <Select.Root
                    value={field.value === true
                        ? ['true']
                        : field.value === false
                            ? ['false']
                            : []
                    }
                    onValueChange={(item) => {
                        field.onChange(item.value[0] === 'true') //Converto para Booleano e o RHF salva no estado a referencia
                    }}
                    collection={status}
                    size="sm"
                    
                >
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Selecione frete" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.ClearTrigger />
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                        <Select.Content >
                            {status.items.map((item) => (
                                <Select.Item item={item} key={item.value}>
                                    {item.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Select.Root>
            )}
        />


    )
}


const status = createListCollection({
    items: [
        { label: "Sim", value: 'true' },
        { label: "Não", value: 'false' }
    ]
})