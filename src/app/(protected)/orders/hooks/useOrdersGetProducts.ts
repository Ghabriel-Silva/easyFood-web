import { useQuery } from "@tanstack/react-query"
import {ProductsResponse } from "../../products/interfaces/products"

const fetchData = async (): Promise<ProductsResponse> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/product?status=active&price=maior`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    const body = await res.json()

    if (!res.ok) {
        throw new Error(body.message || "Erro ao buscar produtos")
    }

    return {
        data: body.data.products ?? [],
        frete: body.data.frete,
        fromCache: body.data.fromCache
    } as ProductsResponse
}

export function useOrdersGetProducts() {
    return useQuery<ProductsResponse>({
        queryKey: ["product-data"],
        queryFn: fetchData,
        refetchOnWindowFocus: true,
        retry: 3,
    })
}
