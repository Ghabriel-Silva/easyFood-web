"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Box, Text } from "@chakra-ui/react"
import { Pie, PieChart, Sector, Tooltip } from "recharts"
import { TextTitle } from "@/app/(protected)/dashboard/components/index"

interface PropsPie {
  totalMoney: string
  orderCompleted: string
  orderPreparing: string
  orderPending: string
  orderCancelled: string
}

interface DataProps {
  data?: PropsPie
}

export const OrdersStatusPieChart = ({ data }: DataProps) => {
  const safeData = data ?? {
    totalMoney: "0",
    orderCompleted: "0",
    orderPreparing: "0",
    orderPending: "0",
    orderCancelled: "0",
  }

  const values = [
    Number(safeData.orderCancelled),
    Number(safeData.orderCompleted),
    Number(safeData.orderPending),
    Number(safeData.orderPreparing),
  ]

  const hasData = values.some((v) => v > 0)

  const chartData = hasData
    ? [
        { name: "Cancelados", value: values[0], color: "red.solid" },
        { name: "Completos", value: values[1], color: "green.solid" },
        { name: "Pendentes", value: values[2], color: "pink.solid" },
        { name: "Preparando", value: values[3], color: "orange.solid" },
      ]
    : [
        {
          name: "Sem dados",
          value: 1, 
          color: "bg.muted",
        },
      ]

  const chart = useChart({
    data: chartData,
  })

  const total = chart.getTotal("value")

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
        title="Pedidos no período"
        description="Apresenta o resumo dos pedidos por status (concluídos, pendentes e cancelados) no período selecionado."
      />

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
              if (!hasData) return ""

              const { value } = chart.data[index ?? -1]
              const percent = total > 0 ? value / total : 0

              return `${name}: ${(percent * 100).toFixed(1)}%`
            }}
            shape={(props) => (
              <Sector
                {...props}
                fill={chart.color(props.payload!.color)}
              />
            )}
          />
        </PieChart>
      </Chart.Root>

      {!hasData && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text fontSize="sm">
            Sem dados
          </Text>
        </Box>
      )}
    </Box>
  )
}