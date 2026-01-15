import { IOrderResponse } from "@/app/(protected)/orders/interfaces/orders-data";
import { useQuery } from "@tanstack/react-query";
import { FilterOrderSchemaInterface } from "../validations/filter-orders";
import { getDateToFilter } from "../helpers/getDateToFilter";

const URL_API = process.env.NEXT_PUBLIC_URL_API

const fetchData = async (filters: FilterOrderSchemaInterface): Promise<IOrderResponse> => {
    const today: Date = getDateToFilter(0)
    const berforeToday: Date = getDateToFilter(1)


    const filterDefault = {
        startDate: berforeToday,
        finalDate: today,
        ...filters
    }

    const res = await fetch(`${URL_API}/order/filter`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filterDefault),
    });
    if (!res.ok) {
        const erroBody = await res.json().catch(() => ({}))
        const error = new Error(erroBody.message || 'Erro ao Buscar dados, atualize e tente Novamente')

        throw error
    }
    return res.json();
}

export function useOrdersData(filters: FilterOrderSchemaInterface) {
    return useQuery<IOrderResponse>({
        queryFn: () => fetchData(filters),
        queryKey: ['order-data', filters], //Só vai buscar os dados quando o filter mudar 
        staleTime:  60 * 1000,
        refetchInterval:  60 * 1000,
        refetchOnWindowFocus: "always",
        retry: 1
    })
}
