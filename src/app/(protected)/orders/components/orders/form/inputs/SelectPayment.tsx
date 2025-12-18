import { Select, createListCollection } from "@chakra-ui/react";
import { PropsSelect } from "@/app/(protected)/orders/interfaces/props-select"

export const SelectPayment = ({ value, onValueChange }: PropsSelect) => {
    return (
        <Select.Root
            collection={status}
            value={value ? [value] : []} //Converto para array o select entende apenas Array  vem de field.value === "pix" e select converte para value={["pix"]}
            onValueChange={(e) => onValueChange(e.value[0])}  //Valor vem como Array e converto para string onValueChange("pix") E isso volta para onValueChange={field.onChange}
            size="sm"
            positioning={{ placement: "bottom" }}
        >
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Selecione método " />
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
        { label: "Dinheiro ", value: "Dinheiro" },
        { label: "Cartão", value: "Cartão" },
        { label: "Pix", value: "Pix" },
        { label: "Outros", value: "Outros" }
    ],
})
