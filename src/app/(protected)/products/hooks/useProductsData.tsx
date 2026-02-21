import { useQuery } from "@tanstack/react-query";
import { IProductOutput } from "../interfaces/products";
import { FilterProductsType } from "../validations/filter-products";


const ProductsData = async (data: FilterProductsType): Promise<IProductOutput[]> => {
    const params = new URLSearchParams()

    if (data.status) {
        params.append("status", data.status)
    }

    if (data.price) {
        params.append("price", data.price)
    }

    const query = params.toString()
    const url = query
        ? `${process.env.NEXT_PUBLIC_URL_API}/product?${query}`
        : `${process.env.NEXT_PUBLIC_URL_API}/product`
        
    const res = await fetch(url, {
        method: 'GET',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const body = await res.json()

    if (!res.ok) {
        throw new Error(body.message || 'Erro ao Filtrar Produtos')
    }
    console.log(body)

    return body.data.products
}


export function useProductsData(data: FilterProductsType | null) {
    return useQuery<IProductOutput[], Error>({
        queryKey: ["data-products", data],
        queryFn: () => ProductsData(data ?? {}),
    })
}