import { FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form"
import { CreateProductsInterface, CreateProductsSchema } from "../../validations/create-products"
import { yupResolver } from "@hookform/resolvers/yup"
import { HStack, Input, Stack, InputGroup, Textarea } from "@chakra-ui/react"
import { Toaster } from "@/components/ui/toaster";
import { FormField, OpcionalView } from "@/ui/index"
import { useEffect, useState } from "react"
import { UniMedidaSelect, SwitchInput, QuantityInput } from "@/app/(protected)/products/components/index"
import { SelectCategoryInput } from "./inputs/SelectCategoryInput"
import { UseProductsCreate } from "../../hooks/useProductsCreate"


type formFather = {
    formRef: React.RefObject<HTMLFormElement | null>
    success: () => void
}

export const FormContainer = ({ formRef , success}: formFather) => {
    const [checked, setChecked] = useState(false)

    const methods = useForm({
        resolver: yupResolver(CreateProductsSchema),
        mode: 'onBlur',
        defaultValues: {
            expirationDate: null,
            description: null,
            quantity: null,
            category_id: 'sswswsw'
        }
    })

    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = methods

    useEffect(() => {
        if (!checked) {
            setValue('quantity', null, { shouldValidate: true })
        }
    }, [checked])

    const uni_Medida = useWatch({
        control,
        name: "uni_medida",
    })

    const { mutate } = UseProductsCreate()

    const OnSubmit: SubmitHandler<CreateProductsInterface> = (data: CreateProductsInterface) => {
        mutate(data, {
            onSuccess: () => {
                reset()
                success()
            }
        })
    }


    return (
        <FormProvider {...methods}>
            <form ref={formRef} noValidate onSubmit={handleSubmit(OnSubmit)} >
                <Stack>
                    < Toaster />
                    <HStack align={"start"} flexWrap={"wrap"}>
                        <FormField error={errors.name?.message} label="Nome" isRequired={true}>
                            <Input {...register('name')} placeholder="X-Calabresa" />
                        </FormField>
                        <FormField label="price" error={errors.price?.message} isRequired={true}>
                            <InputGroup startElement="R$" endElement="BLR">
                                <Input placeholder="0.00" inputMode="decimal" {...register('price')} />
                            </InputGroup>
                        </FormField>
                    </HStack>
                    <FormField isRequired label="Categoria" error={errors.category_id?.message}>
                        <SelectCategoryInput />
                    </FormField>
                    <HStack align={"start"}>
                        <FormField label={`Quantidade: ${checked ? "Sim" : "Não"}`} >
                            <SwitchInput checked={checked} onChange={setChecked} />
                        </FormField>
                    </HStack>

                    <HStack flexWrap={"wrap"}>
                        <FormField label="Uni Medida" error={errors.uni_medida?.message} isRequired={true}>
                            <UniMedidaSelect />
                        </FormField>
                        {["kg", "g", "none"].includes(uni_Medida) && checked && (
                            <QuantityInput typeInput="Input-Decimal" />
                        )
                        }
                        {["l", "un", "porcao", "fatia", "pedaco", "combo", "none"].includes(uni_Medida) && checked && (
                            <QuantityInput typeInput="Input-Interger" />
                        )}
                    </HStack>
                    <HStack>
                        <FormField label="Validade do Produto" error={errors.expirationDate?.message}>
                            <Input type="date" {...register('expirationDate')} />
                        </FormField>
                    </HStack>
                    <OpcionalView title="Info Adicionais">
                        <FormField label="Descrição" error={errors.description?.message} textHelper="Max 600 caracteres.">
                            <Textarea {...register("description")} placeholder="Prensado artesanal com queijo..." variant="outline" />
                        </FormField>
                    </OpcionalView>
                </Stack>
            </form>
        </FormProvider>
    )
}