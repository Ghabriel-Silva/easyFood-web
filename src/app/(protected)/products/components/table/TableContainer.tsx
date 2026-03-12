"use client"

import { MuiThemeProvider } from "@/theme/MuiDatables/providers/MuiThemeProvider";
import MUIDataTable from "mui-datatables";
import { useProductsData } from "../../hooks/useProductsData";
import { Badge, Flex, HStack } from "@chakra-ui/react";
import { tranformeUniMedida } from "@/helpers/transformeUniMedida";
import { MdCheckCircle, MdHighlightOff } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip"
import { InfoTip } from "@/components/ui/toggle-tip";
import { InfoNull, FullScreenLoading, StatEmpaty, TableText, PopovelFilter } from "@/ui/index";
import { DialogInfoProducts, FilterContainer, UpdateStatus } from "@/app/(protected)/products/components/index";
import { useFilterStore } from "@/stores/filterStore";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { defaultOption } from "@/helpers/defaultOpetionTable";


export const TableContainer = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const page = Number(searchParams.get('page')) || 1;
    const rowsPerPage = Number(searchParams.get('limit')) || 10;

    const tablePage = page - 1;

    const filter = useFilterStore((state) => state.filter)

    const { data, isLoading, isError } = useProductsData(
        filter ?? {},
        page,
        rowsPerPage
    )



    const dataProducts = data?.data.products
    const countPage = data?.data.total


    if (isLoading) return <FullScreenLoading />
    const errorApi = isError && <StatEmpaty title="Nenhum produto encontrado" description="Não foi possível carregar os dados. Tente atualizar a página ou volte mais tarde." />

    const columns = [
        {
            name: "name",
            label: "Ver Detalhes",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    if (!dataProducts) return null
                    const row = dataProducts[dataIndex]
                    return (
                        < DialogInfoProducts product={row} />
                    )

                }
                ,

            },
        },


        //Coluna quantidade do produto com regra de negocio
        {
            name: "quantity",
            label: "Quantidade",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    if (!dataProducts) return null
                    const product = dataProducts[dataIndex]

                    const value = product.quantity
                    const unit = product.uni_medida

                    if (value === null) {
                        return (
                            <Badge>
                                <TableText>Sem controle</TableText>
                            </Badge>
                        )
                    }

                    const quantity = Number(value)

                    const unitsWithDecimal = ["kg", "g", "none"]

                    const formattedQuantity = unitsWithDecimal.includes(unit)
                        ? quantity.toFixed(3)
                        : Math.floor(quantity)

                    if (quantity === 0) {
                        return (
                            <Tooltip
                                contentProps={{ css: { "--tooltip-bg": "tomato" } }}
                                positioning={{ placement: "right-end" }}
                                showArrow
                                content="Estoque zerado. Reponha ou marque como sem controle"
                            >
                                <Badge colorPalette="red">
                                    <TableText>{formattedQuantity}</TableText>
                                </Badge>
                            </Tooltip>
                        )
                    }

                    return <TableText>{formattedQuantity}</TableText>
                }
            }
        },

        //Coluna preço + unidade
        {
            name: 'price',
            label: "Preço / Unidade",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    if (!dataProducts) return null
                    const row = dataProducts[dataIndex]; // data é Product[] pego o indice 
                    return (
                        <Flex gap={2}>
                            <TableText>R${row.price}</TableText>
                            {row.uni_medida !== "none" && (
                                <Badge colorPalette={"yellow"}><TableText>{tranformeUniMedida(row.uni_medida)}</TableText></Badge>
                            )}
                        </Flex>
                    );
                },
            }
        },
        //Coluna description
        {
            name: "description",
            label: "Descrição",
            options: {
                customBodyRender: (value: string | null) => {
                    return (
                        !value ? (
                            <HStack maxW={"200px"} justifyContent={"center"}>
                                <InfoNull />
                            </HStack>
                        ) : value.length > 10 ?
                            (
                                <HStack gap={0} flexDirection={"row"}>
                                    <InfoTip
                                        content={value} />
                                    <TableText>
                                        {value.slice(0, 20)}...
                                    </TableText>
                                </HStack>
                            ) : (
                                <TableText>
                                    {value}
                                </TableText>
                            )
                    );
                },


            }
        },

        //Coluna Status ativo ou inativo
        {
            name: "isAvailable",
            label: "Status",
            options: {
                customBodyRender: (value: boolean) =>
                    value ? (
                        <Badge colorPalette={"green"}>
                            <TableText>Ativo</TableText>
                            <MdCheckCircle />
                        </Badge>
                    ) : (
                        <Badge colorPalette={"red"}>
                            <MdHighlightOff />
                            <TableText>Inativo</TableText>
                        </Badge>
                    ),
            },
        },
        {
            name: '',
            label: "Mudar Status",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    if (!dataProducts) return null
                    const row = dataProducts[dataIndex]
                    return (
                        <UpdateStatus statusDefault={row.isAvailable} id={row.id} />
                    )
                }
            }
        },
    ]



    const options = {
        ...defaultOption,
        serverSide: true,
        tableBodyHeight: "calc(100vh - 210px)",
        responsive: "standard",
        elevation: 0,
        //Paginação 
        count: countPage,
        page: tablePage,
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: [10, 25, 50],

        onChangePage: (newPage: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(newPage + 1));
            router.push(`${pathname}?${params.toString()}`);
        },

        onChangeRowsPerPage: (newRows: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("limit", String(newRows));
            params.set("page", "1"); // Volta pra primeira página na URL
            router.push(`${pathname}?${params.toString()}`);
        },

        storageKey: 'tabela-produtos',
        customToolbar: () => (
            <PopovelFilter title="Filtrar Produtos">
                <FilterContainer />
            </PopovelFilter>
        ),
        textLabels: {
            body: {
                noMatch: errorApi,
                toolTip: "Classificar",
            },
        }
    };
    return (
        <MuiThemeProvider>
            <MUIDataTable
                options={options}
                data={dataProducts ?? []}
                columns={columns}
            />
        </MuiThemeProvider>
    )
}
