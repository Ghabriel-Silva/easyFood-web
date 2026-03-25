import { useQuery } from "@tanstack/react-query"
import { DashboardData } from "@/app/(protected)/dashboard/interfaces/dashbordResponse"

const getDashboard = async (): Promise<DashboardData> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/dashboard`,
        {
            method: "GET",
            cache: "no-store",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )

    const body = await response.json()

    if (!response.ok) {
        throw new Error(body.message || "Erro ao carregar dados de dashboard")
    }

    return body
}

export function useDashboardData() {
    return useQuery<DashboardData>({
        queryKey: ["dashboard"],
        queryFn: getDashboard,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,
    })
}