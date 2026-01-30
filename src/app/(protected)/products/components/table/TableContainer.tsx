import { MuiThemeProvider } from "@/theme/MuiDatables/providers/MuiThemeProvider";
import MUIDataTable from "mui-datatables";
import { useProductsData } from "../../hooks/useProductsData";
import { Badge, Flex, Text, HStack, Button, CloseButton, Drawer, Portal, Icon } from "@chakra-ui/react";
import { tranformeUniMedida } from "@/helpers/transformeUniMedida";
import { MdCheckCircle, MdHighlightOff, MdVisibility } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip"
import { InfoTip } from "@/components/ui/toggle-tip";
import { InfoNull } from "@/ui";







export const TableContainer = () => {


    const { data, isLoading, isError } = useProductsData()

    if (isLoading) return <p>Carregando</p>
    if (isError) return <p>Erro ao carregar dados</p>;

    const columns = [
        {
            name: "name",
            label: "Ver Detalhes",
            options: {
                customBodyRender: (value: string) =>
                    <Drawer.Root>
                        <Drawer.Trigger asChild cursor={"pointer"}>
                            <Badge gap={2} colorPalette={"blue"}>
                                <Icon size={"sm"}>
                                    <MdVisibility />
                                </Icon>
                                {value}
                            </Badge>
                        </Drawer.Trigger>
                        <Portal>
                            <Drawer.Backdrop />
                            <Drawer.Positioner>
                                <Drawer.Content>
                                    <Drawer.Header>
                                        <Drawer.Title>Drawer Title</Drawer.Title>
                                    </Drawer.Header>
                                    <Drawer.Body>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </Drawer.Body>
                                    <Drawer.Footer>
                                        <Button variant="outline">Cancel</Button>
                                        <Button>Save</Button>
                                    </Drawer.Footer>
                                    <Drawer.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Drawer.CloseTrigger>
                                </Drawer.Content>
                            </Drawer.Positioner>
                        </Portal>
                    </Drawer.Root>,
                sort: false,
            },
        },
        //Coluna quantidade do produto com regra de negocio
        {
            name: "quantity",
            label: "Quantidade",
            options: {
                customBodyRender: (value: number | null) =>
                    value ? (
                        <Text >{value}</Text>
                    ) : value === 0 ? (
                        <Tooltip
                            contentProps={{ css: { "--tooltip-bg": "tomato" } }}
                            positioning={{ placement: "right-end" }}
                            showArrow content="Estoque zerado. Reponha ou marque como sem controle">
                            <Badge colorPalette={"red"}>0</Badge>
                        </Tooltip>
                    ) : (
                        <Badge>Sem controle</Badge>
                    )

            }
        },

        //Coluna preço + unidade
        {
            name: 'price',
            label: "Preço / Unidade",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    if (!data) return null
                    const row = data[dataIndex]; // data é Product[] pego o indice 
                    return (
                        <Flex gap={2}>
                            <Text>R${row.price}</Text>
                            {row.uni_medida !== "none" && (
                                <Badge>{tranformeUniMedida(row.uni_medida)}</Badge>
                            )}
                        </Flex>
                    );
                },
            }
        },
        {
            name: "description",
            label: "Descrição",
            options: {
                customBodyRender: (value: string | null) => {
                    return (
                        value === null ? (
                            <HStack maxW={"200px"} justifyContent={"center"}>
                                <InfoNull />
                            </HStack>
                        ) : value.length > 10 ?
                            (
                                <HStack gap={0} flexDirection={"row"}>
                                    <InfoTip
                                        content={value} />
                                    <Text>
                                        {value.slice(0, 20)}...
                                    </Text>
                                </HStack>
                            ) : (
                                <Text>
                                    {value}
                                </Text>
                            )
                    );
                },
                sort: false,

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
                            ATIVO
                            <MdCheckCircle />
                        </Badge>
                    ) : (
                        <Badge colorPalette={"red"}>
                            <MdHighlightOff />
                            INATIVO
                        </Badge>
                    ),
            },
        },
    ]



    const options = {
        tableBodyHeight: 'calc(100vh - 205px)',
        responsive: 'stacked',
        elevation: 1,
        selectableRows: "none",
        sort: true,
        download: true,
        filter: true,
        searchable: false,
        search: true,
        rowsPerPageOptions: [10, 25, 50],
        print: false,
        storageKey: 'tabela-produtos',
        textLabels: {
            pagination: {
                next: "Próxima Página",
                previous: "Página Anterior",
                rowsPerPage: "Linhas por página:",
                displayRows: "de",
            },
            body: {
                noMatch: "Nenhum registro encontrado",
                toolTip: "Classificar",
            },
            toolbar: {
                // Muda o texto que aparece ao passar o mouse  no ícone da barra
                viewColumns: "Exibir Colunas",
            },
            viewColumns: {
                // Muda o título que aparece dentro do menu/modal que abre
                title: "Mostrar/Ocultar Colunas",
                titleAria: "Mostrar/Ocultar Colunas da Tabela",
            },
        }



    };
    return (


        <MuiThemeProvider>
            <MUIDataTable
                data={data ?? []}
                columns={columns}
                options={options}
            />
        </MuiThemeProvider>
    )
}
