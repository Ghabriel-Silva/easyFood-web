import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import { ProductSetStatus } from "../interfaces/products";

interface sendStatus {
    id: string
    status: string
}
export const setStatus = async ({ id, status }: sendStatus): Promise<ProductSetStatus> => {
    const response = await fetch(`/api/proxy/products/${id}/status`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    })
    const body: ProductSetStatus = await response.json()
    if (!response.ok) throw new Error(body.message || 'Erro ao mudar status')
    return body
}



export function useMutateSetStatusProducts() {
    const queryClient = useQueryClient()

    return useMutation<ProductSetStatus, Error, sendStatus>({
        mutationFn: setStatus,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["data-products"],
                exact: false,
            })
            queryClient.invalidateQueries({
                queryKey: ["dashboard"]
            })
            await queryClient.invalidateQueries({
                queryKey: ["product-data"],
            })
            return toaster.create({
                description: `Status Atualizado com sucesso`,
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