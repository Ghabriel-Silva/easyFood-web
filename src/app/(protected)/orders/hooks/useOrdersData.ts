import { IOrderResponse } from "@/app/(protected)/orders/interfaces/orders-data";
import { useQuery } from "@tanstack/react-query";
import { FilterOrderSchemaInterface } from "../validations/filter-orders";
import { getDateToFilter } from "../helpers/getDateToFilter";

const fetchData = async (filters: FilterOrderSchemaInterface): Promise<IOrderResponse> => {
    const today: Date = getDateToFilter(0)
    const berforeToday: Date = getDateToFilter(1)

    const filterDefault = {
        startDate: berforeToday,
        finalDate: today,
        ...filters
    }

    const res = await fetch(`/api/proxy/order/filter`, {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterDefault),
    })
    const body = await res.json()
    if (!res.ok) throw new Error(body.message || "Erro ao buscar pedidos")
    return body ?? []
}

export function useOrdersData(filters: FilterOrderSchemaInterface) {
    return useQuery<IOrderResponse>({
        queryFn: () => fetchData(filters),
        queryKey: ['order-data', filters],
    })
}
