"use client"

import { Box, Text } from "@chakra-ui/react"
import { TextTitle } from "@/app/(protected)/dashboard/components/index"

import { Chart, useChart } from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"

type PaymentMethod = {
  method: string
  quantity: string
}

type Props = {
  data?: PaymentMethod[]
}

export const PaymentMethodsChart = ({ data }: Props) => {
  const safeData = data ?? []
  const hasData = safeData.length > 0

  const getColorToken = (method: string) => {
    switch (method) {
      case "Dinheiro": return "green.500"
      case "Cartão": return "blue.500"
      case "Pix": return "teal.500"
      default: return "gray.400"
    }
  }

  const formattedData = hasData
    ? safeData.map((item) => ({
      type: item.method,
      value: Number(item.quantity) || 0,
      colorToken: getColorToken(item.method),
    }))
    : [
      {
        type: "Sem dados",
        value: 0,
        colorToken: "gray.300",
      },
    ]

  const chart = useChart({
    data: formattedData,
    series: [{ name: "value", color: "blue.500" }],
  })

  return (
    <Box
      w="100%"
      p={4}
      borderRadius="lg"
      boxShadow="sm"
      flex={"1"}
      position="relative"
    >
      <TextTitle
        title="Métodos de pagamento"
        description="Exibe a distribuição dos pedidos por método de pagamento no período selecionado. Por padrão, considera os últimos 30 dias ou o intervalo definido no filtro de datas."
      />

      <Chart.Root h="250px" chart={chart}>
        <BarChart data={chart.data} responsive>
          <CartesianGrid
            stroke={chart.color("border.muted")}
            vertical={false}
          />

          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={chart.key("type")}
            dy={10}
            tick={{ fill: chart.color("fg.muted"), fontSize: 11 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: chart.color("fg.muted"), fontSize: 11 }}
          />

          <Tooltip
            cursor={{ fill: chart.color("bg.muted") }}
            content={<Chart.Tooltip />}
          />

          <Bar
            dataKey={chart.key("value")}
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chart.color(entry.colorToken)}
              />
            ))}
          </Bar>
        </BarChart>
      </Chart.Root>

     
      {!hasData && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          pointerEvents="none"
        >
          <Text fontSize="sm" >
            Nenhum dado disponível
          </Text>
        </Box>
      )}
    </Box>
  )
}