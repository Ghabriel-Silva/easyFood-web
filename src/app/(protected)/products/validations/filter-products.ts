

import * as yup from "yup"

type status = 'active' | 'inactive'
type price = 'menor' | 'maior'


export const FilterProductsSchema = yup.object({
    status: yup
        .mixed<status>()
        .oneOf(['active', 'inactive'], 'O Valor tem que ser ou ativo ou inativo'),

    price: yup
        .mixed<price>()
        .oneOf(['maior', 'menor'], 'o preço pode ser o maior ou menor ')
})


export type FilterProductsType = yup.InferType<typeof FilterProductsSchema>