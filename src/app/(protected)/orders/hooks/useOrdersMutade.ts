import { ISetStatusReq } from "@/app/(protected)/orders/interfaces/orders-set-status";
import { toaster } from "@/components/ui/toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const URL_API = process.env.NEXT_PUBLIC_URL_API


const setNewStatus = async (orderId: string, novoStatus: string, ) => {
    const res = await fetch(`${URL_API}/order/${orderId}/status`, {
        method: "PATCH",
         credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: novoStatus
        })
    })
    if (!res.ok) {
        throw new Error('Erro na api')
    }
    return res.json()
}


export function useOrdersMutade() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, novoStatus, }: ISetStatusReq) => setNewStatus(orderId, novoStatus),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["order-data"],
            });
            return toaster.create({
                title: `Status do Pedido ${variables.orderId.slice(0, 4)}  atualizado`,
                description: `Status modificado  para ${variables.novoStatus}`,
                closable: true,
                duration: 2000,
                type: 'success'
            })
        },


        onError: (_, variables) => {
            return toaster.create({
                title: `Pedido ${variables.orderId.slice(0, 4)}  não  foi atualizado`,
                description: `Tente  novamente mais tarde`,
                closable: true,
                duration: 2000,
                type: 'error'
            })
        }
    });
}