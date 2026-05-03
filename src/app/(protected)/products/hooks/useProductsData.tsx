import { useQuery } from "@tanstack/react-query";
import { ProductResponseData } from "../interfaces/products";
import { FilterProductsType } from "../validations/filter-products";



interface ProductsParams extends FilterProductsType {
    page: number;
    limit: number
}  

const ProductsData = async (data: ProductsParams): Promise<ProductResponseData> => {
    const params = new URLSearchParams()
    if (data.status && data.status !== "all") {
        params.append("status", data.status)
    }


    if (data.price) params.append("price", data.price)

    params.append("page", String(data.page))
    params.append("limit", String(data.limit))


    const query = params.toString()
    const url = query
        ? `${process.env.NEXT_PUBLIC_URL_API}/product?${query}`
        : `${process.env.NEXT_PUBLIC_URL_API}/product`

    
    const res = await fetch(url, {
        method: 'GET',
        credentials: "include",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const body: ProductResponseData = await res.json()
    if (!res.ok) {
        throw new Error(body.message || 'Erro ao Filtrar Produtos')
    }
    return body
}


export function useProductsData(
    filters: FilterProductsType,
    page: number,
    limit: number
) {
    return useQuery<ProductResponseData>({
        queryKey: ["data-products", filters, page, limit],
        queryFn: () =>
            ProductsData({
                ...filters,
                page: page,
                limit,
            }),
        staleTime: 1000 * 60 * 5,
    });
}