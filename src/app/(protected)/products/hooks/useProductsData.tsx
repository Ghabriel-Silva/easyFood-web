import { useQuery } from "@tanstack/react-query";
import {Product} from "../interfaces/products";


const ProductsData = async (): Promise<Product[]> => {
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
    return useQuery<Product[], Error>({
        queryKey: ["product-data"],
        queryFn: ProductsData,
        refetchOnWindowFocus: true,
        retry: 3,
    })
}