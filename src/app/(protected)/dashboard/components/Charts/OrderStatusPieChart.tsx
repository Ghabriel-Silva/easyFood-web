"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Box } from "@chakra-ui/react"
import { Pie, PieChart, Sector, Tooltip } from "recharts"
import { TextTitle } from "@/app/(protected)/dashboard/components/index"

interface PropsPie {
    totalMoney: string
    orderCompleted: string
    orderPreparing: string
    orderPending: string
    orderCancelled: string
}
interface data {
    data?: PropsPie
}
export const OrdersStatusPieChart = ({ data }: data) => {
    const safeData = data ?? {
        totalMoney: "0",
        orderCompleted: "0",
        orderPreparing: "0",
        orderPending: "0",
        orderCancelled: "0",
    }
    const chart = useChart({
        data: [
            { name: "Cancelados", value: Number(safeData.orderCancelled), color: "red.solid" },
            { name: "Completos", value: Number(safeData.orderCompleted), color: "green.solid" },
            { name: "Pendentes", value: Number(safeData.orderPending), color: "pink.solid" },
            { name: "Preparando", value: Number(safeData.orderPreparing), color: "orange.solid" }
        ],
    })

    return (
        <Box
            w="100%"
            p={4}
            borderRadius="lg"
            boxShadow="sm"
            flex={"1"}
        >
            <TextTitle  title="Pedidos no período"  description="Apresenta o resumo dos pedidos por status (concluídos, pendentes e cancelados) no período selecionado. Por padrão, considera os últimos 30 dias ou o intervalo definido no filtro de datas." />
            <Chart.Root h="250px" mx="auto" chart={chart}>
                <PieChart responsive>
                    <Tooltip
                        cursor={false}
                        animationDuration={100}
                        content={<Chart.Tooltip hideLabel />}
                    />
                    <Pie
                        isAnimationActive={false}
                        data={chart.data}
                        dataKey={chart.key("value")}
                        outerRadius={100}
                        innerRadius={0}
                        labelLine={false}
                        label={({ name, index }) => {
                            const { value } = chart.data[index ?? -1]
                            const percent = value / chart.getTotal("value")
                            return `${name}: ${(percent * 100).toFixed(1)}%`
                        }}
                        shape={(props) => (
                            <Sector {...props} fill={chart.color(props.payload!.color)} />
                        )}
                    />
                </PieChart>
            </Chart.Root>
        </Box>
    )
}
