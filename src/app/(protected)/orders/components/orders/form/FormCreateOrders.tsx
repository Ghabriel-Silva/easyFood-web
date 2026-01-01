"use client"
import { useForm, Controller, useFieldArray, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input, Stack, InputGroup, Textarea, Field, HStack, Badge, Text, Alert, VStack } from "@chakra-ui/react"
import { withMask } from "use-mask-input"

import { OrderCreateSchema } from "@/app/(protected)/orders/validations/orders-create"
import { SelectCreateStatus, SelectProducts } from "@/app/(protected)/orders/components/orders/form/index"
import { SelectFrete } from "@/app/(protected)/orders/components/orders/form/index"
import { FormField } from "@/app/(protected)/orders/components/orders/form/index"
import { FormFieldOptional } from "@/app/(protected)/orders/components/orders/form/index"
import { SelectPayment } from "@/app/(protected)/orders/components/orders/form/index"
import { useState } from "react"


interface CreateOrdersProps {
    token: string
}


export const FormCreateOrders = ({ token }: CreateOrdersProps) => {

    //Estados para valores opcionais e para mostrar valores em tela
    const [somaFreteValor, setFreteValor] = useState<number>(0)
    const [adicionalValor, setAdicionalValor] = useState<number>(0)
    const [desconteValor, setdesconteValor] = useState<number>(0)
    const [frete, setFrete] = useState<boolean>(false)




    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(OrderCreateSchema),
        defaultValues: {
            items: [], //Existe um campo chamado items e ele é um array.
            isFreightApplied: false,
        },
    })
    const methods = useForm({
        resolver: yupResolver(OrderCreateSchema),
        defaultValues: {
            items: [],
            isFreightApplied: false,
        },
    })

    const {
        fields, append, remove, } = useFieldArray({
            control,
            name: "items",
        }) 

    const selectProducts = fields.map(item => item.product_id)
    const totalProdutos = fields.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const totalFinal = totalProdutos + (adicionalValor || 0) + (somaFreteValor || 0) - (desconteValor || 0);


    const onSubmit = handleSubmit((data) => {
        console.log(data)
        reset(
            {
                paymentMethod: undefined,
                isFreightApplied: undefined,
                items: [],
                additionalValue: null,
                customerAddress: null,
                customerName: null,
                customerPhone: "",
                customFreight: null,
                discountValue: null,
                observations: null,

            },
            {
                keepErrors: false,
            }
        )
    })

    return (
        <FormProvider {...methods}>
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
                                            const newValue = value === 'true'
                                            field.onChange(value === 'true') //"true" === "true"   // true
                                            setFrete(newValue)
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
                                            const valor: number = e.target.value = e.target.value.replace(/[^0-9.]/g, "")
                                            setFreteValor(Number(valor))
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
                                            const valor: number = e.target.value = e.target.value.replace(/[^0-9.]/g, "")
                                            setAdicionalValor(Number(valor))
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
                                            const valor: number = e.target.value = e.target.value.replace(/[^0-9.]/g, "")
                                            setdesconteValor(Number(valor))
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
                    <FormField
                        label="Produtos / Quantidade"
                        error={errors.items?.message}
                    >
                        <Stack gap={3} width="100%">
                            <SelectProducts
                                token={token}
                                onAddItem={(item) => append(item, { shouldFocus: true })}
                                selectedProductIds={selectProducts}
                            />
                            {fields.length > 0 && (
                                <Stack gap={4} width="100%">
                                    {fields.map((item, index) => {
                                        const itemsTotal = Number(item.quantity * item.price);
                                        return (
                                            <HStack
                                                key={item.id}
                                                justify="space-between"
                                                width="100%"
                                                padding={4}
                                                borderRadius="lg"
                                                boxShadow="sm"
                                                _hover={{ boxShadow: "md", bg: "gray.50" }}
                                                flexWrap={{ base: "wrap", md: "nowrap" }}
                                            >
                                                <Stack gap={1} flex="1" minW={{ base: "60%", md: "auto" }}>
                                                    <Text fontWeight="semibold">{item.name}</Text>
                                                    <HStack gap={2} flexWrap="wrap">
                                                        <Badge colorPalette="purple">Qtde: { } {item.quantity.toFixed(3)}</Badge>
                                                        <Badge colorPalette="green">Preço: R$ {item.price.toFixed(2)}</Badge>
                                                        <Badge colorPalette="blue">Total: R$ {itemsTotal.toFixed(2)}</Badge>
                                                    </HStack>
                                                </Stack>
                                                <Button
                                                    size="xs"
                                                    variant={"ghost"}
                                                    colorPalette="red"
                                                    onClick={() => remove(index)}
                                                    _hover={{ bg: "red.50" }}
                                                >
                                                    Remover
                                                </Button>
                                            </HStack>
                                        );
                                    })}
                                </Stack>
                            )}
                        </Stack>
                    </FormField>
                    <VStack
                        w={"100%"}
                        pt={4}
                        textAlign="right"
                        fontWeight="bold"
                        fontSize="lg"
                    >
                        <Text textStyle="md" fontWeight={'medium'} > Total do Pedido:</Text>
                        <Badge textStyle="lg" variant={'plain'} colorPalette="green" >R${(totalFinal.toFixed(2))} </Badge>
                        {frete && (
                            <Alert.Root status="info" size={"sm"} >
                                <Alert.Indicator />
                                <Alert.Title textStyle="xs">Frete Padrão será calculado depois da criação do pedido!</Alert.Title>
                            </Alert.Root>
                        )}
                    </VStack>
                    <Button type="submit" colorPalette={"green"}>
                        Criar Pedido
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    )
}