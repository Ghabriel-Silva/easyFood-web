import { tranformeQuantity } from "@/helpers/transformeQuantity"
import { tranformeUniMedida } from "@/helpers/transformeUniMedida"
import { Table, Flex, Box } from "@chakra-ui/react"
import { TextTitle } from "@/app/(protected)/dashboard/components/index"

type LowProducts = {
    id: string
    name: string
    unidade: string
    totalSold: string
}
interface PropsData {
    data: LowProducts[]
}

export const TableLowProducts = ({ data }: PropsData) => {

    return (
        <Flex flex={"1"}>
            <Box
                w={"100%"}
                p={4}
                borderRadius="lg"
                boxShadow="sm"
            >
                <TextTitle title={"Menos Vendido"}   description="Apresenta os 5 produtos com menor volume de vendas no período selecionado, com base nos últimos 30 dias ou no intervalo definido no filtro de datas."/>
                <Table.Root size="sm" variant={"outline"} >
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Posição</Table.ColumnHeader>
                            <Table.ColumnHeader>Nome</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end">Quantidade</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((item, index) => {
                            const count = index + 1
                            return (
                                (
                                    <Table.Row key={item.id}>
                                        <Table.Cell>{count}</Table.Cell>
                                        <Table.Cell>{item.name} </Table.Cell>
                                        <Table.Cell textAlign="end">{tranformeQuantity(item.unidade, item.totalSold)} {tranformeUniMedida(item.unidade)}</Table.Cell>
                                    </Table.Row>
                                )
                            )
                        }
                        )}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Flex>
    )
}

