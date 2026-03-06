import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryResponseUpdateName, sendValorToApi } from "../interfaces/category";
import { toaster } from "@/components/ui/toaster";



const updateCategoryName = async ({ id, name }: sendValorToApi): Promise<CategoryResponseUpdateName> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/category/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    })

    const body: CategoryResponseUpdateName = await response.json()
    if (!response.ok) {
        throw new Error(body.message || `Erro ao editar nome da categoria para ${name}`)
    }
    return body
}


export function useCategoryMutateName() {
    const queryClient = useQueryClient()

    return useMutation<CategoryResponseUpdateName, Error, sendValorToApi>({
        mutationFn: updateCategoryName,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
            return toaster.create({
                description: `Nome Atualizado com sucesso: ${data.data.name}`,
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