import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useState } from "react"

interface PropsSelectStatus {
    statusDefault: boolean
}
export const SelectStatus = ({ statusDefault }: PropsSelectStatus) => {

    const converteValue: string = statusDefault ? 'active' : 'inactive'


    const [value, setValue] = useState<string[]>([converteValue])
    return (
        <Select.Root
            size={"xs"}
            maxWidth={"130px"}
            collection={status}
            width="320px"
            value={value}
            onValueChange={(e) => setValue(e.value)}
        >
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Selecione Status" />
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
