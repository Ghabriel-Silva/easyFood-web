"use client"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input, Stack, InputGroup, Textarea, Field, HStack } from "@chakra-ui/react"
import { withMask } from "use-mask-input"

import { OrderCreateSchema } from "@/app/(protected)/orders/validations/orders-create"
import { SelectCreateStatus } from "@/app/(protected)/orders/components/orders/form/index"
import { SelectFrete } from "@/app/(protected)/orders/components/orders/form/index"
import { FormField } from "@/app/(protected)/orders/components/orders/form/index"
import { FormFieldOptional } from "@/app/(protected)/orders/components/orders/form/index"
import { SelectPayment } from "@/app/(protected)/orders/components/orders/form/index"
import { FormGetProducts } from "@/app/(protected)/orders/components/orders/form/index"

interface CreateOrdersProps {
    token: string
}


export const FormCreateOrders = ({ token }: CreateOrdersProps) => {


    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm({
        resolver: yupResolver(OrderCreateSchema)
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        reset(
            {
                paymentMethod: undefined,
                isFreightApplied: undefined,
            },
            {
                keepErrors: false,
            }
        )
    })

    return (
        <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start" >

                <HStack flexWrap="wrap" >

                    <FormField label="Cliente" error={errors.customerName?.message}>
                        <Input {...register("customerName")} placeholder="ex: Maria db" />
                    </FormField>
                    <FormField label="Telefone" error={errors.customerPhone?.message}>
                        <Controller
                            control={control}
                            name="customerPhone"
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="(99) 99999-9999"
                                    ref={withMask("(99) 99999-9999")}
                                />
                            )}
                        />
                    </FormField>
                    <FormField label="Endereço" error={errors.customerAddress?.message}>
                        <Input   {...register("customerAddress")} placeholder="ex: Rua das rosas 01" />
                    </FormField>
                </HStack>


                <HStack flexWrap="wrap" width={'100%'}>
                    <FormField label="Status" error={errors.status?.message}>
                        <Controller
                            control={control}
                            name="status"
                            defaultValue="Pendente"
                            render={({ field }) => (
                                <SelectCreateStatus
                                    name={field.name}
                                    value={field.value ?? ""}
                                    onValueChange={field.onChange}
                                />
                            )}
                        />
                    </FormField>
                    <FormField label="Frete" error={errors.isFreightApplied?.message}>
                        <Controller
                            control={control}
                            name="isFreightApplied"
                            defaultValue={false}
                            render={({ field }) => (
                                <SelectFrete
                                    name={field.name}
                                    value={field.value ? 'true' : 'false'}
                                    onValueChange={(value) => {
                                        field.onChange(value === 'true') //"true" === "true"   // true
                                    }}
                                />
                            )}
                        />
                    </FormField>

                    <FormField label="Método pagamento" error={errors.paymentMethod?.message}>
                        <Controller
                            control={control}
                            name="paymentMethod"
                            defaultValue={undefined}
                            render={({ field }) => (
                                <SelectPayment
                                    name={field.name}
                                    value={field.value ?? ""} //estado inicial é "" depois que o estado muda, o React executa novamente: field.value === "pix"
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }} //Usuário clica no select onValueChange({ value: ["pix"] }) 
                                >
                                </SelectPayment>
                            )}
                        />
                    </FormField>
                </HStack>


                <FormFieldOptional >
                    <FormField label="Frete Customizado" error={errors.customFreight?.message}>
                        <InputGroup startAddon="R$" endAddon="BRL">
                            <Input
                                defaultValue={""}
                                placeholder="0,00"
                                {...register("customFreight", {
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(/[^0-9.,]/g, "")
                                    },
                                })}
                            />
                        </InputGroup>
                    </FormField>

                    <FormField label="Valor adicional" error={errors.additionalValue?.message}>
                        <InputGroup startAddon="R$" endAddon="BRL">
                            <Input
                                placeholder="0,00"
                                {...register("additionalValue", {
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(/[^0-9.,]/g, "")
                                    },
                                    required: true
                                })}
                            />
                        </InputGroup>
                    </FormField>

                    <FormField label="Desconto  valor" error={errors.discountValue?.message}>
                        <InputGroup startAddon="R$" endAddon="BRL">
                            <Input
                                placeholder="0,00"
                                {...register("discountValue", {
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(/[^0-9.,]/g, "")
                                    },
                                    required: true
                                })}
                            />
                        </InputGroup>
                    </FormField>

                    <FormField label="Obeservações" error={errors.observations?.message} >
                        <Textarea  {...register("observations")} placeholder="Comment" />
                        <Field.HelperText>Max 600 characteres.</Field.HelperText>
                    </FormField>

                
                </FormFieldOptional>
                
                <FormGetProducts token={token} /> 
                
                <Button type="submit" >Submit</Button>
            </Stack>
        </form>
    )
}