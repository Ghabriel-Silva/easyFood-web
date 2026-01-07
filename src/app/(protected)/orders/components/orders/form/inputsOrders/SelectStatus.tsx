"use client"

import { OrderFormSchemaInterface } from "@/app/(protected)/orders/validations/orders-form"
import {
    Select,
    createListCollection,
} from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"


export const SelectStatus = () => {

    const { control } = useFormContext<OrderFormSchemaInterface>()
    return (
        <Controller
            name="status"
            control={control}
            render={({ field }) => (
                <Select.Root
                    value={field.value ? [field.value] : []}

                    onValueChange={(items) => {
                        const value = items.value[0]
                        field.onChange(value)
                    }}
                    collection={status}
                    size="sm"
                  
                >
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Selecione Status" />
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
        { label: "Pendente ", value: "Pendente" },
        { label: "Completo", value: "Completo" },
        { label: "Entregue", value: "Entregue" },
        { label: "Cancelado", value: "Cancelado" },
        { label: "Preparando", value: "Preparando" },
    ],
})
