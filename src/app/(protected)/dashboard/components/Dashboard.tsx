import { Stack, Box , HStack} from "@chakra-ui/react"
import { useDashboardData } from "../hooks/useDashboardData"
import { FullScreenLoading } from "@/ui/index"
import { OrdersLineChart, TodayOrdersCards , PaymentMethodsChart, OrdersStatusPieChart} from "@/app/(protected)/dashboard/components/index"

export const Dashboard = () => {
  const { data, isPending } = useDashboardData()
 
  return (
    <Box>
      {isPending && (
        <FullScreenLoading />
      )}
      <Stack gap={15}>
         <TodayOrdersCards summary={data?.todayOrdersSummary} />
        <OrdersLineChart data={data?.monthlyOrdersSummary} />
        <HStack flexWrap={"wrap"} > 
          <PaymentMethodsChart data={data?.paymentMethodsSummary} />
          <OrdersStatusPieChart data={data?.allOrdersSummary} />
        </HStack>
      </Stack>
    </Box>
  )
}