import { useQuery } from "@tanstack/react-query";
import { Product } from "../interfaces/porducts";


const fetchData = async (): Promise<Product[]> => {
    const resp = await fetch("http://localhost:8080/product?status=active&price=maior", {
        method: "GET",
        credentials:'include',
        headers: {
            "Content-Type": "application/json",
           
        }
    })

    console.log('Chamando a rota para buscar os Produtos')
    const json = await resp.json()
    return json.data
}

export function useOrdersCreate() {
    return useQuery<Product[]>({
        queryFn:  fetchData,
        queryKey: ['product-data'],
        staleTime: 0,
        refetchOnWindowFocus: true,
    })
}