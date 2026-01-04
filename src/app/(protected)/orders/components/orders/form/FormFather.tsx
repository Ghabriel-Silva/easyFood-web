"use client"
import {
    Button, HStack, Stack

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
import { FormCreateOrders } from "."
import { SelectProducts } from "./FormCreateOrders"


export const FormFather = () => {
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
        formState: { errors }
    } = methods

    const OnSubmite: SubmitHandler<OrderFormSchemaInterface> = (data) => {
        console.log(data)
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
                        <FormField label="Frete Customizado">
                            <GroupInput
                                placeholder="0.00"
                                groupProps={{
                                    startAddon: "R$",
                                    endAddon: "BLR",
                                }}
                            />
                        </FormField>
                        <FormField label="Valor Adicional">
                            <GroupInput
                                placeholder="0.00"
                                groupProps={{
                                    startAddon: "R$",
                                    endAddon: "BLR",
                                }}
                            />
                        </FormField>
                        <FormField label="Desconto Valor">
                            <GroupInput
                                placeholder="0.00"
                                groupProps={{
                                    startAddon: "R$",
                                    endAddon: "BLR",
                                }}
                            />
                        </FormField>
                        <FormField label="Obersevação" fullWidth>
                            <TextArea placeholder="ex: Retirar cebola..." autoresize />
                        </FormField>
                    </FieldOptional>

                    <FormField label="Produtos/Quantidade">
                       <SelectProducts/>
                    </FormField>



                    <Button type="submit">Enviar</Button>
                </Stack>
            </form>
        </FormProvider>

    )
}