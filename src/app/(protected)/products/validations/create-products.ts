import { transformeNumber } from "@/helpers/tranformeNumber"
import { UniMedida } from "@/interfaces/type-uni-medida"
import * as yup from "yup"


export const CreateProductsSchema = yup.object({
    name: yup
        .string()
        .transform((value) => (value?.trim() === "" ? null : value))
        .max(100, "O nome do produto pode conter até 100 caracteres")
        .required('O nome do Produto é obrigatório'),
    price: yup
        .number()
        .transform(transformeNumber)
        .typeError("O preço deve ser um numero")
        .positive('O preço deve ser positivo')
        .required(),
    quantity: yup
        .number()
        .typeError("A quantida tem que ser um numero")
        .transform(transformeNumber)
        .moreThan(0, 'A quantida deve ser maior que 0')
        .optional()
        .nullable(),
    uni_Medida: yup
        .mixed<UniMedida>()
        .oneOf(Object.values(UniMedida))
        .required("A Unidade de medida é obrigatória"),
    expirationDate: yup
        .date()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
        .test(
            'data-validate-is-before-today',
            'A data de validade não pode ser anterior ao dia de hoje',
            (value) => {
                if (!value) return true
                if (value < new Date()) return false
                console.log(value)
            }

        )
        .typeError("Data invalida"),
    description: yup
        .string()
        .max(600, 'Oberservações deve ter no máximo 600 caracteres')
        .notRequired(),

    category_id: yup
        .string()
        .required('Categoria é obrigatória')
})

export type CreateProductsInterface = yup.InferType<typeof CreateProductsSchema>