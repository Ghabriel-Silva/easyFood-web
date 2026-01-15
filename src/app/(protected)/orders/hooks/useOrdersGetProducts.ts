import { useQuery } from "@tanstack/react-query";
import { Product } from "../interfaces/porducts";



const fetchData = async (): Promise<Product[]> => {
    const res = await fetch("http://localhost:8080/product?status=active&price=maior", {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",

        }
    })
    if (!res.ok) {
        const erroBody = await res.json().catch(() => ({}))
        const error = new Error(erroBody.message || 'Erro ao Buscar dados, tente novamente')

        throw error
    }
    return res.json();
}

export function useOrdersGetProducts() {
    return useQuery<Product[]>({
        queryFn: fetchData,
        queryKey: ['product-data'],
        staleTime: 0,
        refetchOnWindowFocus: true,
        retry: 1
    })
}