import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditeUserInfo } from "../interfaces/editeUser";
import { EditeInfoUserType } from "../validations/editeInfos";
import { toaster } from "@/components/ui/toaster";



const editeUser = async (infoData: EditeInfoUserType): Promise<EditeUserInfo> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/config`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(infoData)
    })
    const body: EditeUserInfo = await response.json()
    if (!response.ok) {
        throw new Error(body.message || 'Erro ao Editar Informações')
    }
    return body
}


export function useEditeInfoUser() {
    const queryClient = useQueryClient()
    return useMutation<EditeUserInfo, Error, EditeInfoUserType>({
        mutationFn: editeUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["config"]
            })
            return toaster.create({
                description: `Informações atualizadas`,
                closable: true,
                duration: 4000,
                type: 'success'
            })
        },
        onError: () => {
            return toaster.create({
                description: `Não foi Possivel atualizar as informações`,
                closable: true,
                duration: 4000,
                type: 'error'
            })
        }

    })
}