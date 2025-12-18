"use client"

import {
    Select,
    createListCollection,
} from "@chakra-ui/react"


interface PropsSelectCreate {
    name: string
    value: string,
    onValueChange: (value: string) => void
}


export const SelectCreateStatus = ({ value, onValueChange }: PropsSelectCreate) => {
    return (

     
            <Select.Root
                collection={status}
                value={value ? [value] : []}
                onValueChange={(e) => onValueChange(e.value[0])}
                size="sm"
                positioning={{ placement: "bottom" }}
              
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
