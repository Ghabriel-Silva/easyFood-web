// SelectBase.tsx
"use client"

import { Select, createListCollection, Portal, Spinner } from "@chakra-ui/react"

type SelectBaseProps = {
    onChange: (value: string[]) => void
    value: string[] | null | undefined
    placeholder?: string
    items: { label: string; value: string }[]
    isMultiple?: boolean,
    size?: "sm" | "md" | "lg",
    close?: true | false
    isLoading?: boolean,
    isError?: boolean,
    mesageError?: string
}

export function SelectBase({
    value,
    onChange,
    placeholder,
    items,
    isMultiple,
    size = 'sm',
    close = false,
    isLoading,
    isError,
    mesageError
}: SelectBaseProps) {
    const collection = createListCollection({ items })

    return (
        <Select.Root
            invalid={isError}
            closeOnSelect={close}
            multiple={isMultiple ?? true}
            value={value ?? []}
            onValueChange={(details) => onChange(details.value)} //Mostra o valor selecionado ochange contem o valor do array
            collection={collection}
            size={size}
        >
            <Select.HiddenSelect />

            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder={isError ? mesageError :  placeholder} />
                </Select.Trigger>

                <Select.IndicatorGroup>
                    {isLoading && (
                        <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
                    )}
                    <Select.ClearTrigger />
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {items.map((item) => (
                            <Select.Item key={item.value} item={item}>
                                {item.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}
