import { Controller, FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form"
import { CreateProductsInterface, CreateProductsSchema } from "../../validations/create-products"
import { yupResolver } from "@hookform/resolvers/yup"
import { HStack, Input, Stack, InputGroup, NumberInput, Button, Textarea } from "@chakra-ui/react"
import { FormField } from "@/ui/index"
import { useState } from "react"
import { UniMedidaSelect, SwitchInput } from "@/app/(protected)/products/components/index"




export const FormContainer = () => {
    const methods = useForm({
        resolver: yupResolver(CreateProductsSchema),
        mode: 'onBlur',
        defaultValues: {
            quantity: null,
            expirationDate: null,
            description: null
        }
    })

    const {

        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = methods

    const uni_Medida = useWatch({
        control,
        name: "uni_Medida",
    })

    const quantity = useWatch({
        control,
        name: "quantity"
    })



    const OnSubmit: SubmitHandler<CreateProductsInterface> = (data: unknown) => {
        if (!data) return
        console.log(data)
    }


    const [checked, setChecked] = useState(false)
    return (
        <FormProvider {...methods}>
            <form noValidate onSubmit={handleSubmit(OnSubmit)} >
                <Stack>
                    <HStack align={"start"}>
                        <FormField error={errors.name?.message} label="Nome" isRequired={true}>
                            <Input {...register('name')} placeholder="X-Calabresa" />
                        </FormField>
                        <FormField label="price" error={errors.price?.message} isRequired={true}>
                            <InputGroup startElement="R$" endElement="BLR">
                                <Input placeholder="0.00" inputMode="decimal" {...register('price')} />
                            </InputGroup>
                        </FormField>
                    </HStack>

                    <HStack align={"start"}>
                        <FormField label={`Quantidade: ${checked ? "Sim" : "Não"}`} >
                            <SwitchInput checked={checked} disabled={typeof quantity === "number" && quantity > 0} onChange={setChecked} />
                        </FormField>
                    </HStack>

                    <HStack>
                        <FormField label="Uni Medida" error={errors.uni_Medida?.message} isRequired={true}>
                            <UniMedidaSelect />
                        </FormField>
                        {["kg", "g", "none"].includes(uni_Medida) && checked && (
                            <FormField label="Quantidade" error={errors.quantity?.message}>
                                <Controller
                                    control={control}
                                    name="quantity"
                                    render={({ field }) => {
                                        const value = field.value != null && Number.isFinite(field.value)
                                            ? field.value.toString()
                                            : ""
                                        return (
                                            <NumberInput.Root                                        
                                                step={0.1}
                                                formatOptions={{
                                                    minimumFractionDigits: 3,
                                                    maximumFractionDigits: 3,
                                                }}
                                                value={value}
                                                onValueChange={(details) => {
                                                    const stringVal = details.value
                                                    const parsed = Number(stringVal.replace(",", "."))
                                                    field.onChange(isNaN(parsed) ? undefined : parsed)
                                                }}
                                            >
                                                <NumberInput.Control />
                                                <NumberInput.Input placeholder="0.000" />
                                            </NumberInput.Root>
                                        )
                                    }}
                                />
                            </FormField>
                        )
                        }
                        {["l", "un", "porcao", "fatia", "pedaco", "combo", "none"].includes(uni_Medida) && checked && (
                            <FormField label="Quantidade" error={errors.quantity?.message}>
                                <Controller
                                    control={control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <NumberInput.Root                                        
                                            min={0}
                                            step={1}
                                            formatOptions={{
                                                maximumFractionDigits: 0,
                                            }}
                                            value={field.value?.toString()}
                                            onValueChange={(e) => field.onChange(e.valueAsNumber)}
                                        >
                                            <NumberInput.Control />
                                            <NumberInput.Input placeholder="0" />
                                        </NumberInput.Root>
                                    )}
                                />
                            </FormField>
                        )}
                    </HStack>
                    <HStack>
                        <FormField label="Validade do Produto" error={errors.expirationDate?.message}>
                            <Input type="date" {...register('expirationDate')} />
                        </FormField>
                    </HStack>
                    <HStack>
                        <FormField label="Descrição" error={errors.description?.message} textHelper="Max 500 caracteres.">
                            <Textarea {...register("description")} placeholder="Prensado artesanal com queijo..." variant="outline" />
                        </FormField>
                    </HStack>
                </Stack>
                <Button type="submit">Enviar</Button>
            </form>
        </FormProvider>
    )
}