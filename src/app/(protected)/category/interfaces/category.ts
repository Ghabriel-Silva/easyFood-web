
export interface CategoryReponseDataAPI {
    id: string,
    name: string,
    status: boolean,
    is_default: boolean,
    created_at: string
    updated_at: string

}

export interface CategoryReponseAPI {
    message?: string,
    data: CategoryReponseDataAPI[]
}

export interface CategoryResponseUpdateStatus {
    message:string, 
    cache: boolean | null, 
    data: {
        id:string, 
        status:boolean,
    }
}


