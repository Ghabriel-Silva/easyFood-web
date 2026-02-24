import { Button, CloseButton, Dialog, Portal, Badge, HStack, Icon, Stack, Box, SimpleGrid, Flex } from "@chakra-ui/react"
import { TableText, TableLabel } from "@/ui/index";
import { MdVisibility } from "react-icons/md";
import { IProductOutput } from "../../interfaces/products";
import { tranformeUniMedida } from "@/helpers/transformeUniMedida";
import { ValidadeMensage } from "@/app/(protected)/products/components/index"
import { useEditeProduct } from "@/stores/editeProductStore";
interface PropsDialog {
    product: IProductOutput,
}
export const DialogInfoProducts = ({ product }: PropsDialog) => {
    const setEdite = useEditeProduct((s) => s.setEdite)
    const setProducts = useEditeProduct((s) => s.setProduct)

    

    return (
        <Dialog.Root  >
            <Dialog.Trigger asChild cursor={"pointer"} >
                <Badge gap={2} colorPalette="blue" variant="subtle"   >
                    <HStack _hover={{ borderBottom: "1px solid" }}>
                        <Icon fontSize="sm">
                            <MdVisibility />
                        </Icon>
                        <TableText >
                            {product.name}
                        </TableText>
                    </HStack>
                </Badge>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{product.name} </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack gap={6}>

                                <SimpleGrid columns={2} gap={4}>
                                    <Box>
                                        <TableLabel>Produto</TableLabel>
                                        <TableText >
                                            {product.name}
                                        </TableText>
                                    </Box>

                                    <Box>
                                        <TableLabel>Status</TableLabel>
                                        <Badge
                                            colorPalette={product.isAvailable ? "green" : "red"}
                                        >
                                            <TableText>{product.isAvailable ? "Ativo" : "Inativo"}</TableText>
                                        </Badge>
                                    </Box>

                                    <Box>
                                        <TableLabel>Categoria</TableLabel>
                                        <TableText>
                                            {product.category?.name ?? "—"}
                                        </TableText>
                                    </Box>

                                    <Box>
                                        <TableLabel>Unidade</TableLabel>
                                        <TableText>
                                            {product.uni_medida === "none" ? (
                                                <>—</>
                                            ) : (
                                                tranformeUniMedida(product.uni_medida)
                                            )
                                            }
                                        </TableText>
                                    </Box>

                                    <Box>
                                        <TableLabel>Preço</TableLabel>
                                        <TableText>
                                            R$ {product.price}
                                        </TableText>
                                    </Box>

                                    <Box>
                                        <TableLabel>Quantidade</TableLabel>
                                        <TableText>
                                            {product.quantity ?? "—"}
                                        </TableText>
                                    </Box>
                                    <Box>
                                        <TableLabel>Validade</TableLabel>
                                        <ValidadeMensage date={product.expirationDate} />
                                    </Box>

                                    <Box>
                                        <TableLabel>Criado em</TableLabel>
                                        <TableText>
                                            {new Date(product.created_at).toLocaleDateString()}
                                        </TableText>
                                    </Box>

                                </SimpleGrid>

                                <Box>
                                    <TableLabel>Descrição</TableLabel>
                                    <TableText>
                                        {product.description || "Sem descrição"}
                                    </TableText>
                                </Box>

                                <Flex justify="flex-end">
                                    <TableLabel>
                                        Última atualização:{" "}
                                        {new Date(product.updated_at).toLocaleString('pr-BR').replace(",", "-")}
                                    </TableLabel>
                                </Flex>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Dialog.ActionTrigger asChild>
                                <Button
                                    colorPalette="yellow"
                                    onClick={() => {
                                        setEdite(true)
                                        setProducts(product)                               
                                    }}
                                >
                                    Editar
                                </Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}