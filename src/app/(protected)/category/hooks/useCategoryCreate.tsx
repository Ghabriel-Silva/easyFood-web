import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toaster } from "@/components/ui/toaster"
import { CreateCategoryResponse } from "../interfaces/category"


interface categoryResponse {
    name: string
}

const createCategory = async ({ name }: categoryResponse): Promise<CreateCategoryResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/category`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    })
    const body: CreateCategoryResponse = await response.json()

    if (!response.ok) {
        throw new Error(body.message || "Erro ao criar Categoria")
    }

    return body
}

export function useCategoryCreate() {
    const queryClient = useQueryClient()

    return useMutation<CreateCategoryResponse, Error, categoryResponse>({
        mutationFn: createCategory,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["category"],
                exact: false
            })
            toaster.create({
                description: "Categoria criada com sucesso",
                closable: true,
                duration: 4000,
                type: "success"
            })
        },
        onError: (error) => {
            return toaster.create({
                description: error.message || 'Erro ao criar Categorias',
                closable: true,
                duration: 4000,
                type: 'error'
            })
        }
    })
}

