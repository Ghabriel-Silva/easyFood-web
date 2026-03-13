import { useQuery } from "@tanstack/react-query"
import { GetDataConfig } from "../interfaces/editeUser"


const getCategory = async (): Promise<GetDataConfig> => {


  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/config`,
    {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const body: GetDataConfig = await response.json()

  if (!response.ok) {
    throw new Error(body.message || "Erro ao carregar categorias")
  }

  return body
}

export function useUserData() {
  return useQuery<GetDataConfig, Error>({
    queryKey: ["config"],
    queryFn:getCategory,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  })
}