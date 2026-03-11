import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useState } from "react"
import { useCategoryMutateStatus } from "../../../hooks/useCategoryMutateStatus"

interface PropsSelectStatus {
    id: string
    statusDefault: boolean
}
export const SelectStatus = ({ id, statusDefault }: PropsSelectStatus) => {
    const converteValue = statusDefault ? 'active' : 'inactive'
    const [value, setValue] = useState<string[]>([converteValue])


    const { mutate } = useCategoryMutateStatus()
    return (
        <Select.Root
            size={"xs"}
            maxWidth={"130px"}
            collection={status}
            width="320px"
            value={value}
            onValueChange={(e) => {
                setValue(e.value)
                mutate({
                    id: id,
                    status: e.value[0]
                })
            }}
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
