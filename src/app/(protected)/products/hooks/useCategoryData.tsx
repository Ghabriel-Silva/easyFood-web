import { useQuery } from "@tanstack/react-query"
import { CategoryReponseAPI } from "../interfaces/categorys"



const getCategory = async (): Promise<CategoryReponseAPI> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/category`, {
        method: 'GET',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const body: CategoryReponseAPI = await response.json()
    if (!response.ok) {
        throw new Error(body.message || "Erro ao carregar categorias")
    }
    console.log(body)

    return body
}



export function useCategoryData(){
    return useQuery<CategoryReponseAPI, Error>({
        queryKey: ['category'],
        queryFn: getCategory,
        refetchOnWindowFocus: true,
        retry: 1,
    })
}