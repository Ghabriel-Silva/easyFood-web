import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProductCreateResponse } from "../interfaces/products"
import { CreateProductsInterface } from "../validations/create-products"
import { toaster } from "@/components/ui/toaster"


const createProducts = async (data: CreateProductsInterface): Promise<ProductCreateResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/product`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const body: ProductCreateResponse = await response.json()
    if (!response.ok) {
        throw new Error(body.message || "Erro ao Criar Produtos")
    }
    return body
}


export function UseProductsCreate() {
    const queryClient = useQueryClient()
    return useMutation<ProductCreateResponse, Error, CreateProductsInterface>({
        mutationFn: createProducts,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["data-products", "product-data"]
            })
            return toaster.create({
                description: `Produto  ${variables.name} criado com sucesso`,
                closable: true,
                duration: 4000,
                type: 'success'
            })
        },
        onError: (error, variables) => {
            return toaster.create({
                description: `${error.message} ${variables.name}`,
                closable: true,
                duration: 4000,
                type: 'error'
            })
        }
    })
}