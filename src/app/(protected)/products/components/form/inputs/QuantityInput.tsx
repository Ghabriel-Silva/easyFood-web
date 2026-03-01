import { NumberInput, IconButton, HStack } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { CreateProductsInterface } from "../../../validations/create-products"
import { FormField } from "@/ui/index"
import { LuMinus, LuPlus } from "react-icons/lu"

type NameInput = "Input-Interger" | "Input-Decimal"

interface PropsQuantity {
    typeInput: NameInput
}

export const QuantityInput = ({ typeInput }: PropsQuantity) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<CreateProductsInterface>()

    return typeInput === "Input-Decimal" ? (
        <FormField label="Quantidade" error={errors.quantity?.message}>
            <Controller
                control={control}
                name="quantity"
                shouldUnregister={false}
                render={({ field }) => {
                    return (
                        <NumberInput.Root
                            width="100%"
                            step={0.1}
                            formatOptions={{
                                minimumFractionDigits: 3,
                                maximumFractionDigits: 3,
                            }}
                            value={field.value?.toString() ?? ""}
                            onValueChange={(details) => {
                                const parsed = Number(
                                    details.value.replace(",", ".")
                                )

                                field.onChange(Number.isNaN(parsed) ? "" : parsed)
                            }}
                        >
                            <NumberInput.Control />
                            <NumberInput.Input placeholder="0.000" />
                        </NumberInput.Root>
                    )
                }}
            />
        </FormField>
    ) : (
        <FormField label="Quantidade" error={errors.quantity?.message}>
            <Controller
                control={control}
                name="quantity"
                render={({ field }) => (
                    <NumberInput.Root
                        width="100%"
                        min={0}
                        step={1}
                        formatOptions={{
                            maximumFractionDigits: 1,
                        }}
                        value={field.value?.toString() ?? ""}
                        onValueChange={(details) => {
                            field.onChange(details.value)
                        }}
                    >
                        <HStack gap="2">
                            <NumberInput.DecrementTrigger asChild>
                                <IconButton variant="outline" size="sm">
                                    <LuMinus />
                                </IconButton>
                            </NumberInput.DecrementTrigger>
                            <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                            <NumberInput.IncrementTrigger asChild>
                                <IconButton variant="outline" size="sm">
                                    <LuPlus />
                                </IconButton>
                            </NumberInput.IncrementTrigger>
                        </HStack>
                    </NumberInput.Root>
                )}
            />
        </FormField>
    )
}
