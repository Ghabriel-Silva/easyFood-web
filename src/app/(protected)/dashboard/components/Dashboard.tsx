import { Stack, Box, HStack } from "@chakra-ui/react"
import { useDashboardData } from "../hooks/useDashboardData"
import { FullScreenLoading } from "@/ui/index"
import { OrdersLineChart, TodayOrdersCards, PaymentMethodsChart, OrdersStatusPieChart, TableTopProducts, TableLowProducts } from "@/app/(protected)/dashboard/components/index"
import { useFilterStoreDashboard } from "@/stores/filterStoreDashbord"

export const Dashboard = () => {
  const filter = useFilterStoreDashboard((state)=>state.filter)

  const { data, isPending } = useDashboardData(filter || {})

  const OrderToday = data?.todayOrdersSummary
  const orderMonthly = data?.monthlyOrdersSummary
  const paymentMethds = data?.paymentMethodsSummary
  const allOrder = data?.allOrdersSummary
  const lowProducts = data?.dashboardProductsSummary.lowProducts ?? []
  const topProducts = data?.dashboardProductsSummary.topProducts ?? []

  return (
    <Box>
      {isPending && (
        <FullScreenLoading />
      )}
      <Stack gap={15}>
        <TodayOrdersCards summary={OrderToday} />
        <OrdersLineChart data={orderMonthly} />
        <HStack flexWrap={"wrap"} >
          <PaymentMethodsChart data={paymentMethds} />
          <OrdersStatusPieChart data={allOrder} />
        </HStack>
        <HStack flexWrap={"wrap"}>
          <TableTopProducts data={topProducts} />
          <TableLowProducts data={lowProducts} />
        </HStack>
      </Stack>
    </Box>
  )
}