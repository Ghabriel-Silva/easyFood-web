"use client"

import { OrderFormSchemaInterface } from "@/app/(protected)/orders/validations/orders-form"
import { Select, createListCollection } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"


export const SelectPayment = () => {
    const { control } = useFormContext<OrderFormSchemaInterface>()
    return (
        <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
                <Select.Root
                    value={field.value ? [field.value] : []}
                    onValueChange={(item) => {
                        const value = item.value[0]
                        field.onChange(value)
                    }}
                    collection={payment}
                    size="sm"
                  

                >
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Selecione método" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.ClearTrigger />
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>

                    <Select.Positioner>
                        <Select.Content  >
                            {payment.items.map((pay) => (
                                <Select.Item item={pay} key={pay.value}>
                                    {pay.label}
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

const payment = createListCollection({
    items: [
        { label: "Dinheiro ", value: "Dinheiro" },
        { label: "Cartão", value: "Cartão" },
        { label: "Pix", value: "Pix" },
        { label: "Outros", value: "Outros" }
    ],
})

