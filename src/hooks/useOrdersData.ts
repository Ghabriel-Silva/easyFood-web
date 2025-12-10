import { IOrderResponse } from "@/interfaces/orders-data";
import { useQuery } from "@tanstack/react-query";


const fetchData = async (token: string): Promise<IOrderResponse> => {
    const res = await fetch("http://localhost:8080/order/filter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
    });
    console.log("➡ Chamou API /order/filter");
    return res.json()

}

export function useOrdersData(token: string) {
    return useQuery<IOrderResponse>({
        queryFn: () => fetchData(token),
        queryKey: ['order-data', token],
        staleTime: 1000 * 60 * 5,          // 2 minutos (market standard)
    })

}