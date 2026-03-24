import {  Box} from "@chakra-ui/react"
import { useDashboardData } from "../hooks/useDashboardData"
import { FullScreenLoading } from "@/ui/index"

export const Dashboard = () => {
  const {data, isPending} = useDashboardData()
  console.log(data)
  return (
    <Box>
      {isPending && (
        <FullScreenLoading />
      )}
      <Box>
        
      </Box>
    </Box>
  )
}