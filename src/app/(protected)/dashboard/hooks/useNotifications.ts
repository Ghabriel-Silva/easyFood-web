import { useDashboardData } from "./useDashboardData"
import { Notification } from "../interfaces/notificationType"
import { useFilterStoreDashboard } from "@/stores/filterStoreDashbord"

export const useNotifications = () => {
    const filter = useFilterStoreDashboard((state)=>state.filter)

    const { data, isPending, error } = useDashboardData(filter || {})

    const stockNotifications: Notification[] =
        data?.dashboardProductsSummary.quantityZeroProducts?.map((p) => ({
            id: `stock-${p.id}`,
            title: p.name,
            description: "Produto sem estoque",
            type: "persistent",
            category: "stock",
            createdAt: p.updatedAt,
        })) || []

    // atualizações futuras para definir produtos vencidos
    const expiryNotifications: Notification[] = [] 

    const notifications = [
        ...stockNotifications,
        ...expiryNotifications,
    ]

    return {
        notifications,
        isPending,
        error,
    }
}