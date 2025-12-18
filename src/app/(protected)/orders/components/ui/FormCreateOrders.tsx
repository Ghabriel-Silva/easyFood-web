
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input, Stack, InputGroup, Textarea, Field, HStack } from "@chakra-ui/react"
import { withMask } from "use-mask-input"

import { OrderCreateSchema } from "../../validations/orders-create"
import { SelectCreateStatus } from "./SelectCreateStatus"
import { SelectFrete } from "./SelectFrete"
import { FormField } from "./FormField"

export const FormCreateOrders = () => {
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
        reset()
    })

    return (
        <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start" >

                <HStack flexWrap="wrap" >

                    <FormField label="Cliente" error={errors.customerName?.message}>
                        <Input {...register("customerName")} />
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
                        <Input {...register("customerAddress")} />
                    </FormField>

                </HStack>


                <HStack w={"100%"}>
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
                                    onValueChange={field.onChange}
                                />
                            )}
                        />
                    </FormField>
                </HStack>
                <FormField label="Frete Customizado" error={errors.customFreight?.message}>
                    <InputGroup startAddon="R$" >
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

                <FormField label="Obeservações" error={errors.observations?.message}>
                    <Textarea {...register("observations")} placeholder="Comment..." />
                    <Field.HelperText>Max 600 characteres.</Field.HelperText>
                </FormField>



                <Button type="submit" >Submit</Button>
            </Stack>
        </form>
    )
}