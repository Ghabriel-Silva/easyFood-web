import { useQuery } from "@tanstack/react-query"
import { DashboardData } from "@/app/(protected)/dashboard/interfaces/dashbordResponse"
import { dashboardDateType } from "../validations/dashbord"

const getDashboard = async (data: dashboardDateType): Promise<DashboardData> => {
    const params = new URLSearchParams()

    if (data.initial) {
        params.append("initial", new Date(data.initial).toISOString())
    }

    if (data.final) {
        params.append("final", new Date(data.final).toISOString())
    }

    const query = params.toString()

    const url = query
        ? `${process.env.NEXT_PUBLIC_URL_API}/dashboard?${query}`
        : `${process.env.NEXT_PUBLIC_URL_API}/dashboard`

    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
    })

    const body = await response.json()

    if (!response.ok) {
        throw new Error(body.message || "Erro ao carregar dados de dashboard")
    }

    return body
}

export function useDashboardData(data: dashboardDateType) {
    return useQuery<DashboardData>({
        queryKey: ["dashboard", data], 
        queryFn: () => getDashboard(data), 
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,
    })
}