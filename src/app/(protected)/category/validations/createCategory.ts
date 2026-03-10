import * as yup from "yup"



export const createCategorySchema = yup.object({
    name: yup
        .string()
        .transform((value) => (value?.trim() === "" ? null : value))
        .max(30, "O nome da categoria pode conter até 30 caracteres")
        .required('O nome do Produto é obrigatório'),
})


export type createCategoryInterface = yup.InferType<typeof createCategorySchema>