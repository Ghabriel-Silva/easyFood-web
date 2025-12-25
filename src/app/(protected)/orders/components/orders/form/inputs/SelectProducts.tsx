"use client"

import { useEffect, useMemo, useState } from "react"
import { Select, Spinner, createListCollection, Field, Button, Stack, Span, HStack } from "@chakra-ui/react"
import { ToggleTip } from "@/components/ui/toggle-tip"
import { useOrdersCreate } from "@/app/(protected)/orders/hooks/index"
import { Product } from "@/app/(protected)/orders/interfaces/porducts";
import { LuInfo } from "react-icons/lu"
import { InputQuantity } from "./InputQuantity"
import { fontSizeTitleLabel } from "@/themes"

interface SelectProductsProps {
    token: string
}


export const SelectProducts = ({ token }: SelectProductsProps) => {

    const [selectProduct, setSelectProduct] = useState<Product | null>(null)
    const [inputDissabledQt, setInputDisabledQt] = useState<boolean>(true)

    //Estado para pegar  os dados dentro do select e quantidade 
    const [inputItems, setInputItems] = useState({
        name: "",
        product_id: "",
        quantity: '',
        price: ''
    })
    useEffect(() => {
        console.log("inputItems atualizado:", inputItems)
    }, [inputItems])

    const handleQuantityChange = (value: string) => {
        setInputItems(prev => ({
            ...prev,
            quantity: value
        }))
    }

    const { data, isLoading, isError } = useOrdersCreate(token);

    const collection = useMemo(() => {
        console.log('executou a colequition')
        return createListCollection<Product & { disabled?: boolean }>({
            items: (data ?? []).map((product) => ({
                ...product,
                disabled:
                    product.quantity === 0 || //Desabilitando info adcionais do select se tiverem esses parametros
                    product.quantity === undefined,
            })),
            itemToString: (product) => product.name, //Texto que o usuário vai ver na  tela ao selecionar
            itemToValue: (product) => product.id, //Valor iterno Value, oque vou madar para o Bd
        });
    }, [data]);



    return (
        <HStack align={"end"} gap={4} width={"full"}>
            <Field.Root invalid={isError} flex={1}>
                <Select.Root
                    collection={collection}
                    width="100%"
                    onValueChange={(e) => {

                        const productId = e.value[0]
                        const product = collection.items.find(
                            (p) => p.id === productId
                        )
                        setSelectProduct(product ?? null)
                        setInputDisabledQt(false)
                        setInputItems({
                            name: product?.name ?? "",
                            product_id: product?.id ?? "",
                            price: product?.price?.toString() ?? "",
                            quantity: "" // limpa quando troca o produto
                        })
                    }}
                >
                    <Select.HiddenSelect />
                    <Select.Label fontSize={fontSizeTitleLabel}>Produto</Select.Label>
                    <Select.Control >
                        <Select.Trigger>
                            <Select.ValueText placeholder="Selecione um produto" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.ClearTrigger />
                            {isLoading && <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />}
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                        <Select.Content >
                            {collection.items.map((product) => (
                                <Select.Item
                                    item={product}
                                    key={product.id}
                                >
                                    <Stack gap="0" cursor="pointer">
                                        <Select.ItemText>{product.name}</Select.ItemText>
                                        <HStack fontSize="xs" gap="2">
                                            <Span color="fg.muted">
                                                R$ {product.price}
                                            </Span>
                                            {product.quantity === 0 && (
                                                <Span color="red.500">
                                                    Estoque zerado
                                                </Span>
                                            )}
                                            {product.quantity != null && product.quantity > 0 && (
                                                <Span color="green.600">
                                                    Estoque: {product.quantity}
                                                    {product.uni_medida !== 'none' && ` ${product.uni_medida}`}
                                                </Span>
                                            )}
                                        </HStack>
                                    </Stack>
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Select.Root>
                {isError && (
                    <Field.ErrorText>
                        Erro ao carregar produtos
                        <ToggleTip content="Atualize a pagina e tente novamente">
                            <Button asChild size="xs" variant="ghost" color={"red"}>
                                <LuInfo />
                            </Button>
                        </ToggleTip>
                    </Field.ErrorText>
                )}
            </Field.Root>


            <InputQuantity
                infoProducts={selectProduct}
                disabled={inputDissabledQt}
                value={inputItems.quantity}
                onchangeQuantity={handleQuantityChange}
            />

        </HStack>
    )
}
