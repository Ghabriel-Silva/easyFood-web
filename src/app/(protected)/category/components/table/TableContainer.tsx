"use client"

import { defaultOption } from "@/helpers/defaultOpetionTable";
import { MuiThemeProvider } from "@/theme/MuiDatables/providers/MuiThemeProvider"
import MUIDataTable from "mui-datatables"
import { useCategoryData } from "../../hooks/useCategoryData";
import { Badge } from "@chakra-ui/react";
import { MdCheck, MdClear } from "react-icons/md";
import { SelectStatus, InputEditable } from "@/app/(protected)/category/components/index";
import { TableText } from "@/ui/index";
import { CategoryReponseDataAPI } from "../../interfaces/category";



export const TableContainer = () => {
    const { data } = useCategoryData()
    const dataCategory: CategoryReponseDataAPI[] | undefined = data?.data


    const columns = [
        {
            name: "name",
            label: "Nome",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    if (!dataCategory) return null
                    const row = dataCategory[dataIndex]
                    return (
                        <InputEditable name={row.name} isDefault={row.is_default} />
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
        tableBodyHeight: "calc(100vh - 210px)",
        responsive: "standard",
        elevation: 0,
       
    }
    return (
        <MuiThemeProvider>
            <MUIDataTable
                data={dataCategory ?? []}
                columns={columns}
                options={options}
                
            />
        </MuiThemeProvider>
    )
}