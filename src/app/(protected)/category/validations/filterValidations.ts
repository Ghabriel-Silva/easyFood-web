import * as yup from "yup"

type status = 'active' | 'inactive' | 'all'

export const FilterCategorySchema = yup.object({
    status: yup
        .mixed<status>()
        .oneOf(['active', 'inactive', 'all'], 'O Valor tem que ser ou ativo ou inativo')
        .nullable(),
})


export type FilterCategoryType = yup.InferType<typeof FilterCategorySchema>