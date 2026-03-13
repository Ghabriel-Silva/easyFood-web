import { transformeNumber } from "@/helpers/tranformeNumber"
import * as yup from "yup"

export const EditeInfoUserSchema = yup.object({
    name: yup
        .string()
        .max(30, "O nome da empresa deve ter até 30 caracteres")
        .min(3, "O nome da empresa deve ter mais que 3 caracteres")
        .notRequired(),

    customerAddress: yup
        .string()
        .typeError('O endereço deve ser texto')
        .max(60, 'O endereço deve ter no máximo 60 caracteres')
        .transform((value) => (value?.trim() === "" ? null : value))
        .notRequired(),

    customerPhone: yup
        .string()
        .transform((value) => {
            if (!value) return null
            const onlyNumber = value.replace(/\D/g, "")
            return onlyNumber || null
        })
        .test("phone-length", "Telefone inválido", (value) => {
            if (!value) return true
            return value.length === 11 // se for igual a 11 passa no teste
        })
        .nullable()
        .notRequired(),

        defaultFreight: yup
        .number()
        .transform(transformeNumber)
        .notRequired()
})

export type EditeInfoUserType = yup.InferType<typeof EditeInfoUserSchema>