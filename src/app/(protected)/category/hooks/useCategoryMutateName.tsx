import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryResponseUpdateName, sendValorToApi } from "../interfaces/category";
import { toaster } from "@/components/ui/toaster";



const updateCategoryName = async ({ id, name }: sendValorToApi): Promise<CategoryResponseUpdateName> => {
    const response = await fetch(`/api/proxy/category/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    })
    const body: CategoryResponseUpdateName = await response.json()
    if (!response.ok) throw new Error(body.message || `Erro ao editar nome da categoria`)
    return body
}

export function useCategoryMutateName() {
    const queryClient = useQueryClient()

    return useMutation<CategoryResponseUpdateName, Error, sendValorToApi>({
        mutationFn: updateCategoryName,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
            return toaster.create({
                description: `Nome Atualizado com sucesso`,
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