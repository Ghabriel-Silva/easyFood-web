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
import { useEditeProduct } from "@/stores/editeProductStore";


type formFather = {
    formRef: React.RefObject<HTMLFormElement | null>
    success: () => void
}

export const FormContainer = ({ formRef, success }: formFather) => {
    const getPorducts = useEditeProduct((s) => s.product)

    const isEditing = !!getPorducts

    const [checked, setChecked] = useState(false)

    const methods = useForm({
        resolver: yupResolver(CreateProductsSchema),
        mode: 'onBlur',
        shouldUnregister: false,
        defaultValues: {
            name: "",
            price: undefined,
            uni_medida: undefined,
            expirationDate: null,
            description: null,
            quantity: null,
            category_id: ""
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
        if (getPorducts) { //Apenas de não for null
            const expiration = getPorducts.expirationDate
                ? new Date(getPorducts.expirationDate).toISOString().split('T')[0]
                : null

            const hasQuantity = getPorducts.quantity != null

            setChecked(hasQuantity)

            reset({
                name: getPorducts.name,
                price: getPorducts.price,
                quantity: getPorducts.quantity,
                expirationDate: expiration,
                description: getPorducts.description,
                category_id: getPorducts.category?.id ?? "",
                uni_medida: getPorducts.uni_medida
            })

            if (getPorducts.quantity !== null) {
                setChecked(true)

            }
        }

    }, [getPorducts, reset])


    //Bug aqui quando o check é false ele sta o valor como null, verificar o comportamento desse use effect 
    useEffect(() => {
        if (!checked && !isEditing) {
            setValue('quantity', null)
          
        }
    }, [checked, setValue, isEditing])
  


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
                            <Input  {...register('name')} placeholder="X-Calabresa" />
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