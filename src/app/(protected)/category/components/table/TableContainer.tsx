"use client"

import { defaultOption } from "@/helpers/defaultOpetionTable";
import { MuiThemeProvider } from "@/theme/MuiDatables/providers/MuiThemeProvider"
import MUIDataTable from "mui-datatables"
import { useCategoryData } from "../../hooks/useCategoryData";
import { Badge, Text } from "@chakra-ui/react";
import { MdCheck, MdClear  } from "react-icons/md";



export const TableContainer = () => {

    const columns = [

        {
            name: "name",
            label: "Nome",
            options: {
                customBodyRender: (value: string) =>
                    <Text>{value}</Text>

            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                customBodyRender: (value: boolean) =>
                    value ? (
                        <Badge colorPalette={"green"}>Ativo</Badge>
                    ) :
                        (
                            <Badge colorPalette={"green"}>Inativo</Badge>
                        )
            }
        },
        {
            name: "is_default",
            label: "Categoria Padrão",
            options: {
                customBodyRender: (value: boolean) =>
                    value ? (
                      <Badge  colorPalette="blue">Sim< MdCheck /></Badge>
                    ) :
                        (
                            <Badge   colorPalette="red">Não <MdClear /></Badge>
                        )

            }
        },
        {
            name: "created_at",
            label: "Data Criação",
            options: {
                customBodyRender: (value: Date) => {
                    const d = new Date(value).toLocaleDateString("pt-BR")
                    return (
                        <Text>{d}</Text>
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
                        <Text>{d}</Text>
                    )
                }
            }

        },
        // {
        //     label: "Mudar Status",
        // },
        // {

        //     label: "Editar Categoria",
        // }
    ]


    const { data } = useCategoryData()
    console.log(data)


    const options = {
        ...defaultOption,
    }
    return (
        <MuiThemeProvider>
            <MUIDataTable
                data={data?.data ?? []}
                columns={columns}
                options={options}
            />
        </MuiThemeProvider>
    )
}