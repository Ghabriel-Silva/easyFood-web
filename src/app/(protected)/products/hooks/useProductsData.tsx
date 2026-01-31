import { useQuery } from "@tanstack/react-query";
import { IProductOutput } from "../interfaces/products";


const ProductsData = async (): Promise<IProductOutput[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/product`, {
        method: 'GET',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const body = await response.json()
    console.log(body.data.products)
    if (!response.ok) {
        throw new Error(body.message || "Erro ao buscar produtos")
    }

    console.log(body.data.products)
    return body.data.products
}


export function useProductsData() {
    return useQuery<IProductOutput[], Error>({
        queryKey: ["product-data"],
        queryFn: ProductsData,
        refetchOnWindowFocus: true,
        retry: 3,
    })
}