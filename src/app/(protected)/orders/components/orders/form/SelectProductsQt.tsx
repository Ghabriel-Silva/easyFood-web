import { useOrdersGetProducts } from "@/app/(protected)/orders/hooks/index"
import { OrderFormSchemaInterface } from "@/app/(protected)/orders/validations/orders-form"
import { fontSizeTitleLabel } from "@/theme/ChakraUI/themes"
import { FormField } from "@/ui/index"
import {
    Button,
    createListCollection,
    Field,
    HStack,
    Select,
    Span,
    Spinner,
    Stack,
    Table,
    Text,
    IconButton
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { useFieldArray, useFormContext, useFormState, useWatch } from "react-hook-form"
import { Product } from "@/app/(protected)/products/interfaces/products"
import { LuTrash2, LuPlus } from "react-icons/lu"
import { tranformeUniMedida } from "@/helpers/transformeUniMedida"
import { tranformeQuantity } from "@/helpers/transformeQuantity"
import { QuantityInput } from "@/app/(protected)/orders/components/orders/form/index"
import { UniMedida } from "@/interfaces/type-uni-medida"
import { sumOrderTotal } from "../../../helpers/sumOrderTotal"
import {OrderSummary } from "./inputsOrders/ValorTotal"
import { parseBrazilianNumber } from "@/helpers/parseBrasilianNumber"




export const SelectProductsQt = () => {
    const { control } = useFormContext<OrderFormSchemaInterface>()

    const { errors } = useFormState({
        control,
        name: 'items'
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    }) 
    

    const { data, isLoading, isError } = useOrdersGetProducts()

    const productArray: Product[] = useMemo(() => data?.data ?? [], [data]) //Memorizando os dados para não ficar recalculando toda hora 

    //Estados oberservados para imprementar valor total na Ui
    const items = useWatch({ control, name: "items", defaultValue: [] });
    const isFreightApplied = useWatch({ control, name: "isFreightApplied", defaultValue: false });
    const customFreight = useWatch({ control, name: "customFreight", defaultValue: 0 });
    const additionalValue = useWatch({ control, name: "additionalValue", defaultValue: 0 });
    const discountValue = useWatch({ control, name: "discountValue", defaultValue: 0 });


    const totalProdutos = useMemo(() => {
        return items.reduce((acc, item) => {
            const preco = Number(item.price ?? 0)
            const quantidade = Number(item.quantity ?? 0)

            return acc + preco * quantidade
        }, 0)
    }, [items])


    const frete: string | undefined = isFreightApplied ? data?.frete?.defaultFreight : '0'

    const total: string | number = sumOrderTotal({
        frete: frete ?? "0",
        customFreight: parseBrazilianNumber(customFreight ?? 0),
        additionalValue: parseBrazilianNumber(additionalValue ?? 0),
        totalProdutos,
        discountValue: parseBrazilianNumber(discountValue ?? 0)
    })


    const [tempProductId, setTempProductId] = useState<string>("")
    const [tempQuantity, setTempQuantity] = useState<string>("1")

    const [uniMedidaSelecionada, setUniMedidaSelecionada] =
        useState<UniMedida | string>(UniMedida.NONE)

    // Produtos já selecionados na lista final (para desabilitar no select)
    const productsSelectedIds = useMemo(
        () => fields.map(item => item.product_id),
        [fields]
    )


    const collection = useMemo(() => {
        return createListCollection<Product & { disabled?: boolean }>({
            items: productArray.map(product => ({ //Aqui receboi o array de product 
                ...product,
                disabled:
                    product.quantity === 0 || productsSelectedIds.includes(product.id)
            })),
            itemToString: (product) => product.name,
            itemToValue: (product) => product.id
        })
    }, [productArray, productsSelectedIds])


    const handleAddItem = () => {
        const selectedProduct = productArray.find(p => p.id === tempProductId)
        const qtyNumber = Number(tempQuantity)

        if (selectedProduct && qtyNumber > 0) {
            // Adiciona ao React Hook Form
            append({
                product_id: selectedProduct.id,
                name: selectedProduct.name,
                price: Number(selectedProduct.price),
                quantity: qtyNumber,
                uni_medida: selectedProduct.uni_medida,
            })


            setTempProductId("")
            setTempQuantity("1")
        }
    }


    const isProductSelected = !!tempProductId
    const isValidToAdd = isProductSelected && Number(tempQuantity) > 0

    return (
        <Stack width="full" gap={6}>
            <Stack
                gap={4}
                p={4}
                borderWidth="1px"
                borderColor="border.emphasized"
                borderRadius="md"
            >
                <Text fontWeight="medium" fontSize={fontSizeTitleLabel}>Adicionar Produtos</Text>

                <FormField error={errors.items?.message} fullWidth={true} >
                    <HStack align="end" gap={3} flexWrap={{ base: "wrap", md: "nowrap" }} w={"100%"}>
                        {/*  SELEÇÃO DE PRODUTO */}
                        <Field.Root flex={3} >
                            <Select.Root
                                collection={collection}
                                value={tempProductId ? [tempProductId] : []}
                                onValueChange={(details) => {
                                    const productId = details.value[0]
                                    setTempProductId(productId)

                                    const product = productArray.find(p => p.id === productId)
                                    if (product) {
                                        setUniMedidaSelecionada(product.uni_medida)
                                    }
                                }}
                                minW={"200px"}

                            >
                                <Select.HiddenSelect />
                                <Select.Label fontSize="sm">Produto</Select.Label>
                                <Select.Control bg="bg">
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="Selecione um produto..." />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        {isLoading && <Spinner size="xs" />}
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Select.Positioner>
                                    <Select.Content>
                                        {collection.items.map((product) => (
                                            <Select.Item item={product} key={product.id}>
                                                <Stack gap="1">
                                                    {/* Nome do produto */}
                                                    <Select.ItemText fontWeight="medium">
                                                        {product.name}
                                                    </Select.ItemText>

                                                    <HStack fontSize="xs" gap="3" align="center">
                                                        {/* Preço */}
                                                        <Span color="fg.muted">
                                                            R$ {product.price}
                                                        </Span>

                                                        {/* Status de estoque */}
                                                        {product.quantity === 0 ? (
                                                            <Span color="red.500" fontWeight="medium">
                                                                Sem estoque
                                                            </Span>
                                                        ) : product.quantity === null ? (
                                                            <Span color="blue.500" fontWeight="medium">
                                                                Estoque ilimitado
                                                            </Span>
                                                        ) : (
                                                            <Span color="green.500" fontWeight="medium">
                                                                {product.quantity} disponíveis
                                                            </Span>
                                                        )}

                                                        {/* unidade de medida */}
                                                        {product.uni_medida !== "none" && (
                                                            <Span
                                                                px="2"
                                                                py="0.5"
                                                                bg="gray.100"
                                                                borderRadius="md"
                                                                color="gray.600"
                                                                fontSize="2xs"

                                                            >
                                                                {tranformeUniMedida(product.uni_medida)}
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
                        </Field.Root>
                        {/* QUANTIDADE (Disabled até selecionar produto) */}
                        <Field.Root flex={1} disabled={!isProductSelected}  >
                            <Field.Label fontSize="sm">Qtd</Field.Label>
                            <QuantityInput
                                uniMedida={uniMedidaSelecionada}
                                value={tempQuantity}
                                onChange={setTempQuantity}
                            />
                        </Field.Root>
                        {/* BOTÃO ADICIONAR (Disabled até tudo estar válido) */}
                        <Button
                            colorPalette="green"
                            onClick={handleAddItem}
                            disabled={!isValidToAdd}
                            minW="120px"
                        >
                            <LuPlus /> Adicionar
                        </Button>
                    </HStack>

                </FormField>
            </Stack>

            {fields.length > 0 && (
                <Stack gap={2}>
                    <Text fontWeight="medium" fontSize={fontSizeTitleLabel}>Itens do Pedido ({fields.length})</Text>
                    <Table.Root size="sm" variant="outline" striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Produto</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">Qtd</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">Preço </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">Subtotal</Table.ColumnHeader>
                                <Table.ColumnHeader width="50px"></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {fields.map((fieldItem, index) => (
                                <Table.Row key={fieldItem.id}>
                                    <Table.Cell>{fieldItem.name}</Table.Cell>
                                    <Table.Cell textAlign="center">{tranformeQuantity(fieldItem.uni_medida, fieldItem.quantity)} {tranformeUniMedida(fieldItem.uni_medida)} </Table.Cell>
                                    <Table.Cell textAlign="right">
                                        R$ {Number(fieldItem.price).toFixed(2)}
                                    </Table.Cell>
                                    <Table.Cell textAlign="right" fontWeight="bold">
                                        R$ {(Number(fieldItem.price) * fieldItem.quantity).toFixed(2)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <IconButton
                                            aria-label="Remover item"
                                            size="xs"
                                            colorPalette="red"
                                            variant="ghost"
                                            onClick={() => remove(index)}
                                        >
                                            <LuTrash2 />
                                        </IconButton>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Stack>
            )}

            {productArray.length === 0 && (
                <Text color="red" fontSize="sm" textAlign="center" py={4}>
                    Nenhum Produto encontrato, Adicione produtos a sua lista
                </Text>
            )}

            {!isError &&
                fields.length === 0 &&
                Array.isArray(data) &&
                data.length > 0 && (
                    <Text color="fg.muted" fontSize="sm" textAlign="center" py={4}>
                        Nenhum produto adicionado ainda.
                    </Text>
                )}

            <OrderSummary total={total}/>
        </Stack>

    )
}