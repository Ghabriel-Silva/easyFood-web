"use client"
import {
 HStack, Stack,
} from "@chakra-ui/react"
import { FormField, OpcionalView } from "@/ui/index"
import { GroupInput, TextArea, TextInput, WithMaskInput, SelectPayment, SelectFrete, SelectStatus, SelectProductsQt } from "@/app/(protected)/orders/components/orders/form/index"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { OrderFormSchema, OrderFormSchemaInterface } from "@/app/(protected)/orders/validations/orders-form"
import { useOrdersCreate } from "@/app/(protected)/orders/hooks/useOrdersCreate"

type ForFatherProps = {
    formRef:React.RefObject<HTMLFormElement | null>
    success: () => void

}

export const FormFather = ({ success, formRef }: ForFatherProps) => {
    
    const methods = useForm({
        resolver: yupResolver(OrderFormSchema),
        mode: 'onBlur',
        defaultValues: {
            customerPhone: null,
            status: 'Pendente'
        }
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = methods

    const { mutate } = useOrdersCreate()

    const OnSubmite: SubmitHandler<OrderFormSchemaInterface> = (data: OrderFormSchemaInterface) => {
        mutate(data, {
            onSuccess: () => {
                reset({
                    customerName: '',
                    customerPhone: null,
                    customerAddress: '',
                    paymentMethod: undefined,
                    status: 'Pendente',
                    items: [],
                    customFreight: null,
                    additionalValue: null,
                    discountValue: null,
                })
                success()
            }
        })

    }



    return (
        <FormProvider {...methods} >
            <form ref={formRef} onSubmit={handleSubmit(OnSubmite)}  noValidate >
                <Stack
                    gap={4}>
                    <HStack flexWrap="wrap" align="flex-start" >
                        <FormField label="Nome" error={errors.customerName?.message}>
                            <TextInput {...register('customerName')} placeholder="ex: Gabriel" />
                        </FormField>
                        <FormField label="Telefone" error={errors.customerPhone?.message}>
                            <WithMaskInput />
                        </FormField>
                        <FormField label="Endereço" error={errors.customerAddress?.message}>
                            <TextInput {...register('customerAddress')} placeholder="ex: Rua manaus 06" />
                        </FormField>
                    </HStack>
                    <HStack flexWrap={'wrap'} align="flex-start">

                        <FormField label="Método Pagamento" isRequired error={errors.paymentMethod?.message}>
                            <SelectPayment />
                        </FormField>

                        <FormField label="Frete" isRequired error={errors.isFreightApplied?.message}>
                            <SelectFrete />
                        </FormField>

                        <FormField label="Status" error={errors.status?.message}>
                            <SelectStatus />
                        </FormField>
                    </HStack>
                    <OpcionalView title="Info adicionais" >
                        <HStack flexWrap="wrap" align="flex-start">
                            <FormField label="Frete adicional" error={errors.customFreight?.message}>
                                <GroupInput name="customFreight" />
                            </FormField>
                            <FormField label="Valor adicional" error={errors.additionalValue?.message}>
                                <GroupInput name="additionalValue" />
                            </FormField>
                            <FormField label="Desconto" error={errors.discountValue?.message}>
                                <GroupInput name="discountValue" />
                            </FormField>
                        </HStack>
                        <FormField label="Obersevação" fullWidth>
                            <TextArea {...register('observations')} placeholder="ex: Retirar cebola..." autoresize />
                        </FormField>
                    </OpcionalView>
                    <SelectProductsQt />                
                </Stack>
            </form>
        </FormProvider>

    )
}