"use-client"
import MUIDataTable from "mui-datatables";


export const TableContainer = () => {
    const columns = [
        {
            name: "numero",
            label: "Numero",

        },
        {
            name: "nome",
            label: "Nome",

        },
        {
            name: "unidade",
            label: "Unidade",

        },
        {
            name: "validade",
            label: "Validade",

        },
        {
            name: "categoria",
            label: "Categoria"
        },
        {
            name: "descricao",
            label: "Descrição"
        },
        {
            name: "status",
            label: "Status"
        }
    ];

    const data = [
        { numero: "Joe James", nome: "Test Corp", unidade: "Yonkers", validade: "NY", categoria: "TX", descricao: "TX", status: "TX" },
        { numero: "John Walsh", nome: "Test Corp", unidade: "Hartford", validade: "CT", categoria: "TX", descricao: "TX", status: "TX" },
        { numero: "Bob Herm", nome: "Test Corp", unidade: "Tampa", validade: "FL", categoria: "TX", descricao: "TX", status: "TX" },
        { numero: "James Houston", nome: "Test Corp", unidade: "Dallas", validade: "TX", categoria: "TX", descricao: "TX", status: "TX" },
    ];

    const options = {
        elevation: 1,
        selectableRows: "none",
        sort: true,
        download: false,
        filter: false,
        filterlist: false,
        searchable: false,
        search: false,
        rowsPerPageOptions: [10, 25, 50],
        print: false,
        responsive: 'standard',
        storageKey: 'tabela-produtos',
        textLabels: {
            pagination: {
                next: "Próxima Página",
                previous: "Página Anterior",
                rowsPerPage: "Linhas por página:", // O que você tentou fazer antes
                displayRows: "de",
            },
            body: {
                noMatch: "Nenhum registro encontrado",
                toolTip: "Classificar",
            },
            toolbar: {
                // 1. Muda o texto que aparece ao passar o mouse (Tooltip) no ícone da barra
                viewColumns: "Exibir Colunas",
            },
            viewColumns: {
                // 2. Muda o título que aparece dentro do menu/modal que abre
                title: "Mostrar/Ocultar Colunas",
                titleAria: "Mostrar/Ocultar Colunas da Tabela",
            },
        }


    };
    return (


        <MUIDataTable
            data={data}
            columns={columns}
            options={options}


        />
    )
}