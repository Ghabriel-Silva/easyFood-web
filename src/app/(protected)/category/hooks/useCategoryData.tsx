import { useQuery } from "@tanstack/react-query"
import { CategoryReponseAPI } from "../interfaces/category"

interface Filter {
  status?: string
}

const getCategory = async ({ status }: Filter): Promise<CategoryReponseAPI> => {

  const params = new URLSearchParams()

  if (status && status !== "all") {
    params.append("status", status)
  }

  const query = params.toString()
  console.log(query)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/category?${query}`,
    {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const body: CategoryReponseAPI = await response.json()

  if (!response.ok) {
    throw new Error(body.message || "Erro ao carregar categorias")
  }

  return body
}

export function useCategoryData(status?: string) {
  return useQuery<CategoryReponseAPI, Error>({
    queryKey: ["category", status],
    queryFn: () => getCategory({ status }),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,

  })

}