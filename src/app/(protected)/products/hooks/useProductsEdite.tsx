import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductUpdateInterface } from "../validations/editeProducts";
import { ProductCreateResponse, productsEditePayloud } from "../interfaces/products";
import { toaster } from "@/components/ui/toaster";

const URL_API = process.env.NEXT_PUBLIC_URL_API



const editeProducts = async ( dataEditePayloud:productsEditePayloud) => {
    const { data, id } = dataEditePayloud

    const response = await fetch(`${URL_API}/product/${id}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    })
    const body:ProductCreateResponse = await response.json()
    if (!response.ok) {
        throw new Error(body.message || "Erro ao Criar Produtos")
    }
    return body
}

export function useProductEdite() {
    const queryClient = useQueryClient()

    return useMutation<ProductCreateResponse, Error, { data: ProductUpdateInterface; id: string }>({
        mutationFn: editeProducts,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['data-products']
            })
            return toaster.create({
                description: `Produto  atualizado com sucesso`,
                closable: true,
                duration: 4000,
                type: 'success'
            })
        },
        onError: (error) => {
            return toaster.create({
                description: `${error.message} `,
                closable: true,
                duration: 4000,
                type: 'error'
            })
        }
    })
}