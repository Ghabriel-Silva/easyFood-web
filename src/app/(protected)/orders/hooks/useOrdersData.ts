import { IOrderResponse } from "@/app/(protected)/orders/interfaces/orders-data";
import { useQuery } from "@tanstack/react-query";



const fetchData = async (token: string): Promise<IOrderResponse> => {
    const res = await fetch("http://localhost:8080/order/filter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            // startDate: new Date().toISOString().split("T")[0]

        }),
    });
    console.log(" Chamou API /order/filter");
    return res.json()
}

export function useOrdersData(token: string) {
    return useQuery<IOrderResponse>({
        queryFn: () => fetchData(token),
        queryKey: ['order-data', token],
        staleTime: 5 * 60 * 1000,
        refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: "always",
    })
}
