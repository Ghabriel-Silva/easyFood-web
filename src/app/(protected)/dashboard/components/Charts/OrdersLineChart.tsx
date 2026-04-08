"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { VStack } from "@chakra-ui/react"
import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,

} from "recharts"
import { TextTitle } from "@/app/(protected)/dashboard/components/index"

type Props = {
    data?: {
        date: string
        total: number
    }[]
}

type FormattedData = {
    day: string
    tooltipDate: string
    total: number
}


const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null
    const point: FormattedData = payload[0].payload
    return (
        <div
            style={{
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: 4,
            }}
        >
            {point.tooltipDate}: {point.total} pedidos
        </div>
    )
}

export const OrdersLineChart = ({ data }: Props) => {
    const safeData = data ?? []

    const formattedData: FormattedData[] = safeData.map((item) => {
        const isMonthly = item.date.length === 7

        let dayLabel: string;
        let tooltipLabel: string;

        if (isMonthly) {
            const [year, month] = item.date.split("-");
            const dateObj = new Date(Number(year), Number(month) - 1);

            dayLabel = dateObj.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
            tooltipLabel = dateObj.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
        } else {
            
            const dateObj = new Date(item.date);
            dayLabel = dateObj.getUTCDate().toString();
            tooltipLabel = dateObj.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
            });
        }

        return {
            day: dayLabel,
            tooltipDate: tooltipLabel,
            total: item.total,
        };
    })

    const chart = useChart({
        data: formattedData,
        series: [{ name: "total", color: "teal.solid" }],
    })

    if (!data || data.length === 0) return null;

    return (
        <VStack
            p={4}
            borderRadius="lg"
            boxShadow="sm"
            align={"start"}
        >
            <TextTitle title="Evolução de vendas" description="Este gráfico apresenta a evolução dos pedidos ao longo do tempo. Por padrão, exibe os dados diários dos últimos 30 dias. Para períodos superiores a 30 dias, os dados são agrupados e exibidos por mês, facilitando a visualização do desempenho geral." />
            <Chart.Root maxH="xs" chart={chart}>
                <LineChart data={chart.data} responsive>
                    <CartesianGrid stroke={chart.color("border")} vertical={false} />
                    <XAxis
                        axisLine={false}
                        dataKey={chart.key("day")}
                        stroke={chart.color("border")}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        stroke={chart.color("border")}
                    />
                    <Tooltip
                        animationDuration={100}
                        cursor={false}
                        content={<CustomTooltip />}
                    />
                    {chart.series.map((item) => (
                        <Line
                            key={item.name}
                            isAnimationActive={false}
                            dataKey={chart.key(item.name)}
                            stroke={chart.color(item.color)}
                            strokeWidth={2}
                            dot={false}
                        />
                    ))}
                </LineChart>
            </Chart.Root>
        </VStack>
    )
}