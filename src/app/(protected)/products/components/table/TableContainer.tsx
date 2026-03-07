"use client"

import { MuiThemeProvider } from "@/theme/MuiDatables/providers/MuiThemeProvider";
import MUIDataTable from "mui-datatables";
import { useProductsData } from "../../hooks/useProductsData";
import { Badge, Flex, Text, HStack } from "@chakra-ui/react";
import { tranformeUniMedida } from "@/helpers/transformeUniMedida";
import { MdCheckCircle, MdHighlightOff } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip"
import { InfoTip } from "@/components/ui/toggle-tip";
import { InfoNull, FullScreenLoading, StatEmpaty, TableText, } from "@/ui/index";
import { DialogInfoProducts } from "@/app/(protected)/products/components/index";
import { PopovelFilter } from "../filters/PopoverFilter";
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
                customBodyRender: (value: number | null) =>
                    value ? (
                        <TableText >{value}</TableText>
                    ) : value === 0 ? (
                        <Tooltip
                            contentProps={{ css: { "--tooltip-bg": "tomato" } }}
                            positioning={{ placement: "right-end" }}
                            showArrow content="Estoque zerado. Reponha ou marque como sem controle">
                            <Badge colorPalette={"red"}> <TableText >0</TableText></Badge>
                        </Tooltip>
                    ) : (
                        <Badge><TableText>Sem controle</TableText></Badge>
                    )

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
                            <Text>R${row.price}</Text>
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
    ]



    const options = {
        ...defaultOption,
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
            <PopovelFilter />
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
