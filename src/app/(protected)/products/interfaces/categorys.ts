
export interface CategoryReponseDataAPI {
    id: string,
    name: string
    status: boolean,
    company: {
        id: string,
        name: string
    }

}

export interface CategoryReponseAPI {
    message?: string,
    data: CategoryReponseDataAPI[]
}