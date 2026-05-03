import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toaster } from "@/components/ui/toaster"
import { IOrder } from "../interfaces/orders-data"
import { OrderFormSchemaInterface } from "../validations/orders-form"
import { ApiError } from "@/interfaces/api-error"




const createOrders = async (data: OrderFormSchemaInterface) => {
    const res = await fetch(`/api/proxy/order`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    const body = await res.json()
    if (!res.ok) throw body as ApiError
    return body
}

export function useOrdersCreate() {
    const queryClient = useQueryClient()

    return useMutation<IOrder, ApiError, OrderFormSchemaInterface>({
        mutationFn: createOrders,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['order-data'],
            })
            await queryClient.invalidateQueries({
                queryKey: ['product-data'],
                exact: false
            })
            await queryClient.invalidateQueries({
                queryKey: ['data-products'],
                exact: false
            })
            await queryClient.invalidateQueries({
                queryKey: ['dashboard'],
                exact: false
            })



            toaster.create({
                title: "Pedido criado",
                description: "",
                closable: true,
                duration: 2000,
                type: "success"
            })
        },

        onError: (error) => {
            toaster.create({
                title: "Erro ao criar pedido",
                description: error?.message ?? "Erro inesperado ao criar o pedido",
                closable: true,
                duration: 2000,
                type: "error"
            })
        }
    })
}
