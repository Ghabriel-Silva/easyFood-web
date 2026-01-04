"use client"

import { useMemo, useState } from "react"
import {
    Select,
    Spinner,
    createListCollection,
    Field,
    Button,
    Stack,
    Span,
    HStack,
    IconButton
} from "@chakra-ui/react"
import { ToggleTip } from "@/components/ui/toggle-tip"
import { useOrdersCreate } from "@/app/(protected)/orders/hooks"
import { OrderItem, Product } from "@/app/(protected)/orders/interfaces/porducts"
import { LuInfo } from "react-icons/lu"
import { InputQuantity } from "./InputQuantity"
import { fontSizeTitleLabel } from "@/themes"
import { MdAdd } from "react-icons/md";
import { useFormContext } from "react-hook-form"


interface SelectProductsProps {
    selectedProductIds: string[]
    onAddItem: (item: OrderItem) => void //Espero essa propeidade item que tenha esses valores 

}

export const SelectProducts = ({  selectedProductIds, onAddItem }: SelectProductsProps) => {
    const {
        control,
        setValue,
        getValues,
        trigger,
        formState: { errors },
    } = useFormContext()


    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null) // Armazenar os estado de produtos que vem quando o select é selecionado
    const [inputDisabledQt, setInputDisabledQt] = useState(true) //Habilitar e desabilitar o campo de quantidade 


    //React query busca os dados quando entro no select products
    const { data, isLoading, isError } = useOrdersCreate()

    const collection = useMemo(() => {
        console.log('mudou')
        return createListCollection<Product & { disabled?: boolean }>({
            items: (data ?? []).map(product => ({
                ...product,
                disabled:
                    product.quantity === 0 ||
                    selectedProductIds.includes(product.id)
            })),
            itemToString: product => product.name,  // label Nome que aparece no Select 
            itemToValue: product => product.id, //value interno do select no caso ira ser um ID
        })
    }, [data, selectedProductIds])

    const handleAddItem = () => {
        if (!selectedProduct) return

        const quantity = Number(getValues("quantity"))

        // validação simples de UI (não é Yup)
        if (!quantity || quantity <= 0) return

        onAddItem({
            name: selectedProduct.name,
            product_id: selectedProduct.id,
            quantity,
            price: Number(selectedProduct.price),
        })

        // reset
        setSelectedProduct(null)
        setInputDisabledQt(true)
        setValue("quantity", "")
    }



    return (
        <HStack align="end" gap={4} width="full" flexWrap={'wrap'}>
            <Field.Root invalid={isError} flex={1}>
                <Select.Root
                    value={selectedProduct ? [selectedProduct.id] : []}
                    collection={collection}
                    width="100%"
                    minW={'200px'}
                    onValueChange={e => {
                        const productId = e.value[0] //Aqui recebo o id 
                        const product = collection.items.find(p => p.id === productId) // pegando info de products pelo id que veio no e.value[0]
                        setSelectedProduct(product ?? null) //Armazenando no stat o valor do product selecionado 
                        setValue('quantity', "")
                        setInputDisabledQt(false)
                    }}
                >
                    <Select.HiddenSelect />
                    <Select.Label fontSize={fontSizeTitleLabel}>
                        Produto
                    </Select.Label>

                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Selecione um produto" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.ClearTrigger />
                            {isLoading && (
                                <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
                            )}
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>

                    <Select.Positioner>
                        <Select.Content >
                            {collection.items.map(product => (
                                <Select.Item item={product} key={product.id}>
                                    <Stack gap="0">
                                        <Select.ItemText>{product.name}</Select.ItemText>
                                        <HStack fontSize="xs" gap="2">
                                            <Span color="fg.muted">R$ {product.price}</Span>

                                            {product.quantity === 0 && (
                                                <Span color="red.500">Estoque zerado</Span>
                                            )}

                                            {product.quantity! > 0 && (
                                                <Span color="green.600">
                                                    Estoque: {product.quantity}
                                                    {product.uni_medida !== "none" &&
                                                        ` ${product.uni_medida}`}
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
                        <ToggleTip content="Atualize a página e tente novamente">
                            <Button asChild size="xs" variant="ghost" color="red">
                                <LuInfo />
                            </Button>
                        </ToggleTip>
                    </Field.ErrorText>
                )}
            </Field.Root>


            <HStack justifyContent={"space-around"} width={{ base: '100%', md: '50%' }} >
                <InputQuantity
                    infoProducts={selectedProduct}
                    disabled={inputDisabledQt}  //quando seleciono  um valor no select ja passo por props para o input quantidade

                />
                <IconButton
                    colorPalette={'green'}
                    onClick={handleAddItem}
                    disabled={inputDisabledQt}
                >
                    <MdAdd />
                </IconButton>
            </HStack>

        </HStack>
    )
}
