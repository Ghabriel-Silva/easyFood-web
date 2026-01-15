import { useOrdersGetProducts } from "@/app/(protected)/orders/hooks"
import { OrderFormSchemaInterface } from "@/app/(protected)/orders/validations/orders-form"
import { fontSizeTitleLabel } from "@/themes"
import { FormField } from "@/app/(protected)/orders/components/ui/index"
import {
    Button,
    createListCollection,
    Field,
    HStack,
    Input,
    Select,
    Span,
    Spinner,
    Stack,
    Table,
    Text,
    IconButton
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { useFieldArray, useFormContext, useFormState } from "react-hook-form"
import { Product } from "@/app/(protected)/orders/interfaces/porducts" // Ajuste o import conforme seu projeto
import { LuTrash2, LuPlus } from "react-icons/lu"

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

    const { data, isLoading, isError, error } = useOrdersGetProducts()


    const [tempProductId, setTempProductId] = useState<string>("")
    const [tempQuantity, setTempQuantity] = useState<string>("1")

    // Produtos já selecionados na lista final (para desabilitar no select)
    const productsSelectedIds = useMemo(
        () => fields.map(item => item.product_id),
        [fields]
    )


    const collection = useMemo(() => {
        return createListCollection<Product & { disabled?: boolean }>({
            items: (data ?? []).map(product => ({
                ...product,
                disabled:
                    product.quantity === 0 || productsSelectedIds.includes(product.id)
            })),
            itemToString: (product) => product.name,
            itemToValue: (product) => product.id
        })
    }, [data, productsSelectedIds])


    const handleAddItem = () => {
        const selectedProduct = data?.find(p => p.id === tempProductId)
        const qtyNumber = Number(tempQuantity)

        if (selectedProduct && qtyNumber > 0) {
            // Adiciona ao React Hook Form
            append({
                product_id: selectedProduct.id,
                name: selectedProduct.name,
                price: Number(selectedProduct.price),
                quantity: qtyNumber,
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
                                onValueChange={(details) => setTempProductId(details.value[0])}
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
                                                <Stack gap="0">
                                                    <Select.ItemText>{product.name}</Select.ItemText>
                                                    <HStack fontSize="xs" gap="2">
                                                        <Span color="fg.muted">R$ {product.price}</Span>
                                                        {product.quantity === 0 ? (
                                                            <Span color="red.500">Sem estoque</Span>
                                                        ) : (
                                                            <Span color="green.600">Estoque: {product.quantity}</Span>
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
                        <Field.Root flex={1} disabled={!isProductSelected} >
                            <Field.Label fontSize="sm">Qtd</Field.Label>
                            <Input
                                type="number"
                                min={1}
                                placeholder="0"
                                value={tempQuantity}
                                onChange={(e) => setTempQuantity(e.target.value)}
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

            {/* LISTA DE RESULTADOS (TABELA)  */}
            {fields.length > 0 && (
                <Stack gap={2}>
                    <Text fontWeight="medium" fontSize={fontSizeTitleLabel}>Itens do Pedido ({fields.length})</Text>
                    <Table.Root size="sm" variant="outline" striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Produto</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">Qtd</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">Preço Un.</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">Subtotal</Table.ColumnHeader>
                                <Table.ColumnHeader width="50px"></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {fields.map((fieldItem, index) => (
                                <Table.Row key={fieldItem.id}>
                                    <Table.Cell>{fieldItem.name}</Table.Cell>
                                    <Table.Cell textAlign="center">{fieldItem.quantity}</Table.Cell>
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

            {!isError && fields.length === 0 && (
                <Text color="fg.muted" fontSize="sm" textAlign="center" py={4}>
                    Nenhum produto adicionado ainda.
                </Text>
            )}
            {error && (
                <Text color="red" fontSize="sm" textAlign="center" py={4}>
                    {error.message}
                </Text>
            )}


        </Stack>
    )
}