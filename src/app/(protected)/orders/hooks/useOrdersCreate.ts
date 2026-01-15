import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toaster } from "@/components/ui/toaster"
import { IOrder } from "../interfaces/orders-data"
import { OrderFormSchemaInterface } from "../validations/orders-form"
import { ApiError } from "@/interfaces/api-error"
const URL_API = process.env.NEXT_PUBLIC_URL_API




const createOrders = async (data: OrderFormSchemaInterface) => {
    const res = await fetch(`${URL_API}/order`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const body = await res.json()

    if (!res.ok) {
        throw body as ApiError
    }

    return body
}


export function useOrdersCreate() {
    const queryClient = useQueryClient()

    return useMutation<IOrder, ApiError, OrderFormSchemaInterface>({
        mutationFn: createOrders,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["order-data"]
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
                description: error?.message   ?? "Erro inesperado ao criar o pedido",
                closable: true,
                duration: 2000,
                type: "error"
            })
        }
    })
}
