'usee client'

import { createListCollection,  Select } from "@chakra-ui/react"

interface PropsFreteSelect {
    name: string,
    value: string,
    onValueChange: (e: string) => void
}

export const SelectFrete = ({ value, onValueChange }: PropsFreteSelect) => {
    return (
        <Select.Root
            collection={status}
            value={[value]}
            onValueChange={(e) => onValueChange(e.value[0])}
            size="sm"
            positioning={{ placement: "bottom" }}
          
        >
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText />
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
        { label: "Sim", value: 'true' },
        { label: "Não", value: 'false' }
    ]
})