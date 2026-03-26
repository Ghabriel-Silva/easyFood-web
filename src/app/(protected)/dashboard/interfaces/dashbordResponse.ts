export interface DashboardData {
    dashboardProductsSummary: {
        kipsProducts: {
            total: string
            active: string
            inactive: string
            negative_quantity: string
        }
        quantityZeroProducts: {
            id: string
            name: string
            quantity: string
            uni_medida: string
        }[]
        topProducts: {
            id: string
            name: string
            unidade: string
            totalSold: string
        }[]
        lowProducts: {
            id: string
            name: string
            unidade: string
            totalSold: string
        }[]
    }

    allOrdersSummary: {
        totalMoney: string
        orderCompleted: string
        orderPreparing: string
        orderPending: string
        orderCancelled: string
    }

    monthlyOrdersSummary: {
        date: string
        total: number
    }[]

    paymentMethodsSummary: {
        method: string
        quantity: string
    }[]

    todayOrdersSummary: {
        totalMoney: string | null
        totalOrder: string
        orderCompleted: string | null
        orderPreparing: string | null
        orderPending: string | null
        orderCancelled: string | null
    }
}