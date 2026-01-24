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
        filterType: 'checkbox',
        sort: true,
        download: false,
        filter: false,
        filterlist: false,
        searchable: false,
        search: false,
        rowsPerPageOptions: [10, 25, 50],
        print:false, 

        
    };
    return (


        <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}

        />
    )
}