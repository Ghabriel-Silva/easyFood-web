"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"


export const SelectStatus= () => {
    return (
        <Select.Root collection={status} size="xs" width="130px">
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Selecione status" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {status.items.map((framework) => (
                            <Select.Item item={framework} key={framework.value}>
                                {framework.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}

const status = createListCollection({
    items: [
        { label: "Ativo", value: "active" },
        { label: "Inativo", value: "inactive" },
    ],
})
