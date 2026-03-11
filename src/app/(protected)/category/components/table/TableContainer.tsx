"use client"

import { defaultOption } from "@/helpers/defaultOpetionTable";
import { MuiThemeProvider } from "@/theme/MuiDatables/providers/MuiThemeProvider"
import MUIDataTable from "mui-datatables"
import { useCategoryData } from "../../hooks/useCategoryData";
import { Badge } from "@chakra-ui/react";
import { MdCheck, MdClear } from "react-icons/md";
import { SelectStatus, InputEditable, FilterContainer } from "@/app/(protected)/category/components/index";
import { TableText, PopovelFilter, FullScreenLoading, StatEmpaty } from "@/ui/index";
import { CategoryReponseDataAPI } from "../../interfaces/category";
import { useFilterStoreCategory } from "@/stores/filterStoreCstegory";




export const TableContainer = () => {
    const filter = useFilterStoreCategory((state) => state.filter)

    const { data, isLoading, isError } = useCategoryData(filter?.status ?? undefined)

    const dataCategory: CategoryReponseDataAPI[] | undefined = data?.data

    if (isLoading) return <FullScreenLoading />
    const errorApi = isError && <StatEmpaty title="Nenhuma Categoria encontrada" description="Não foi possível carregar os dados. Tente atualizar a página ou volte mais tarde." />

    const columns = [
        {
            name: "name",
            label: "Nome",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    if (!dataCategory) return null
                    const row = dataCategory[dataIndex]
                    return (
                        <InputEditable name={row.name} isDefault={row.is_default} id={row.id} />
                    )
                }

            }
        },
        {
            name: "created_at",
            label: "Data Criação",
            options: {
                customBodyRender: (value: Date) => {
                    const d = new Date(value).toLocaleDateString("pt-BR")
                    return (
                        <TableText>{d}</TableText>
                    )
                }


            }
        },
        {
            name: "updated_at",
            label: "Ultima Edição",
            options: {
                customBodyRender: (value: Date) => {
                    const d = new Date(value).toLocaleString("pt-BR").replace(",", " - ")
                    return (
                        <TableText>{d}</TableText>
                    )
                }
            }

        },
        {
            name: "status",
            label: "Status",
            options: {
                customBodyRender: (value: boolean) =>
                    value ? (
                        <Badge colorPalette={"green"}> <TableText>Ativo</TableText></Badge>
                    ) :
                        (
                            <Badge colorPalette={"red"}><TableText>Inativo</TableText></Badge>
                        )
            }
        },
        {
            name: "is_default",
            label: "Categoria Personalizada",
            options: {
                customBodyRender: (value: boolean) =>
                    value ? (
                        <Badge colorPalette="red"> <TableText>Não</TableText><MdClear /></Badge>
                    ) :
                        (
                            <Badge colorPalette="blue"> <TableText>Sim</TableText>< MdCheck /></Badge>
                        )

            }
        },
        {
            name: '',
            label: "Mudar Status",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    if (!dataCategory) return null
                    const row = dataCategory[dataIndex]
                    return (
                        <SelectStatus statusDefault={row.status} id={row.id} />
                    )
                }
            }
        },
    ]


    const options = {
        ...defaultOption,
        search: true,
        searchable: true,
        tableBodyHeight: "calc(100vh - 210px)",
        responsive: "standard",
        elevation: 0,
        storageKey: 'tabela-categoria',
        customToolbar: () => (
            <PopovelFilter title="Filtrar categorias">
                <FilterContainer />
            </PopovelFilter>
        ),
        textLabels: {
            body: {
                noMatch: errorApi,
                toolTip: "Classificar",
            },
        }

    }
    return (
        <MuiThemeProvider>
            <MUIDataTable
                key={dataCategory?.length}
                data={dataCategory ?? []}
                columns={columns}
                options={options}
            />
        </MuiThemeProvider>
    )
}