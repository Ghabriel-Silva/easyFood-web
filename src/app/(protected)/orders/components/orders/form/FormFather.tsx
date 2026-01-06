"use client"
import {
    Button, HStack, Stack,
} from "@chakra-ui/react"
import { FieldOptional } from "./FieldOptional"
import { FormField } from "./inputsOrders/FormField"
import { GroupInput } from "./inputsOrders/GroupInput"
import { TextArea } from "./inputsOrders/TextAreaInput"
import { TextInput } from "./inputsOrders/TextInput"
import { WithMaskInput } from "./inputsOrders/WithMaskInput"
import { SelectPayment } from "./inputsOrders/SelectPayment"
import { SelectFrete } from "./inputsOrders/SelectFrete"
import { SelectStatus } from "./inputsOrders/SelectStatus"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { OrderFormSchema, OrderFormSchemaInterface } from "../../../validations/orders-form"
import { SelectProductsQt } from "./SelectProductsQt"
import { useOrdersCreate } from "../../../hooks/useOrdersCreate"

type ForFatherProps = {
    success: () => void
}

export const FormFather = ({ success }: ForFatherProps) => {


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
            <form onSubmit={handleSubmit(OnSubmite)}>
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

                        <FormField label="Método Pagamento" error={errors.paymentMethod?.message}>
                            <SelectPayment />
                        </FormField>

                        <FormField label="Frete" error={errors.isFreightApplied?.message}>
                            <SelectFrete />
                        </FormField>

                        <FormField label="Status" error={errors.status?.message}>
                            <SelectStatus />
                        </FormField>
                    </HStack>


                    <FieldOptional>
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
                            <TextArea placeholder="ex: Retirar cebola..." autoresize />
                        </FormField>
                    </FieldOptional>

                    <SelectProductsQt />
                    <Button type="submit"   >Enviar</Button>
                </Stack>
            </form>
        </FormProvider>

    )
}