import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryResponseUpdateStatus } from "../interfaces/category";
import { toaster } from "@/components/ui/toaster";

interface sendStatus {
    id: string
    status: string
}
export const setStatus = async ({ id, status }: sendStatus): Promise<CategoryResponseUpdateStatus> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/category/${id}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: status
        })
    })
    const body: CategoryResponseUpdateStatus = await response.json()
    if (!response.ok) {
        throw new Error(body.message || 'Erro ao mudar status')
    }
    return body
}



export function useCategoryMutateStatus() {
    const queryClient = useQueryClient()

    return useMutation<CategoryResponseUpdateStatus, Error, sendStatus>({
        mutationFn: setStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
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