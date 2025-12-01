export interface LoginValues {
    email: string,
    password: string
}

export interface ErrorResponseLogin {
    status:string 
    statusCode:number, 
    message:string
}