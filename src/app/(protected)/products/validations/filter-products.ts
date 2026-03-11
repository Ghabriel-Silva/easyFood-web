import * as yup from "yup"

type status = 'active' | 'desactivated' |'all'
type price = 'menor' | 'maior'

export const FilterProductsSchema = yup.object({
    status: yup
        .mixed<status>()
        .oneOf(['active', 'desactivated', 'all'], 'O Valor tem que ser ou ativo ou inativo')
        .nullable(),
        
    price: yup
        .mixed<price>()
        .oneOf(['maior', 'menor'], 'o preço pode ser o maior ou menor ')
        .nullable()
})


export type FilterProductsType = yup.InferType<typeof FilterProductsSchema>