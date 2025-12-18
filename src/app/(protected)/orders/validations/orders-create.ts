import { transformeNumber } from "@/helpers/tranformeNumber";
import * as yup from "yup";


export const OrderCreateSchema = yup.object({
    customerName: yup
        .string()
        .typeError("O nome da empresa deve ser texto")
        .max(100, 'O nome da Empresa deve ter até 100 caracteres')
        .transform((value) => (value?.trim() === "" ? null : value))
        .notRequired(),

    customerAddress: yup
        .string()
        .typeError('O endereço deve ser texto')
        .max(200, 'O endereço deve ter no máximo 200 caracteres')
        .transform((value) => (value?.trim() === "" ? null : value))
        .notRequired(),

    customerPhone: yup
        .string()
        .max(20, "O telefone pode ter no máximo 20 caracteres")
        .transform((value) => (value?.trim() === "" ? null : value))
        .notRequired(),

    status: yup
        .string()
        .oneOf(['Pendente', 'Preparando', 'Completo', 'Entregue', 'Cancelado'], "Status inválido")
        .notRequired(),

    paymentMethod: yup
        .string()
        .oneOf(['Dinheiro', 'Cartão', 'Pix', 'Outros'], "Forma de pagamento inválida")
        .required('Forma de pagamento obrigatória!'),


    isFreightApplied: yup
        .boolean()
        .transform((value, originalValue) => {
            if (originalValue === "true") return true
            if (originalValue === "false") return false
            return value
        })
        .typeError("O valor deve ser booleano")
        .required("O campo é obrigatório"),

    customFreight: yup
        .number()
        .transform(transformeNumber)
        .typeError('O frete deve ser um número')
        .min(0, 'O frete deve ser positivo')
        .notRequired(),

    additionalValue: yup
        .number()
        .transform(transformeNumber)
        .typeError('O valor adicional deve ser um número')
        .min(0, 'O valor adicional deve ser positivo')
        .notRequired(),

    discountValue: yup
        .number()
        .transform(transformeNumber)
        .typeError('O valor de desconto deve ser um número')
        .notRequired(),

    observations: yup
        .string()
        .max(600, 'Oberservações deve ter no máximo 200 caracteres')
        .notRequired(),


    // items: yup
    //     .array()
    //     .of(
    //         yup.object({
    //             name: yup
    //                 .string()
    //                 .required('O nome do produto é obrigatório'),

    //             product_id: yup
    //                 .string()
    //                 .required('O produto é obrigatório'),

    //             quantity: yup
    //                 .number()
    //                 .integer('A quantidade deve ser um número inteiro')
    //                 .min(1, 'A quantidade deve ser no mínimo 1')
    //                 .required('A quantidade é obrigatória'),

    //             price: yup
    //                 .number()
    //                 .typeError('O preço deve ser um número')
    //                 .positive('O preço deve ser positivo')
    //                 .required('O preço é obrigatório'),
    //         })
    //     )
    //     .min(1, 'É necessário informar pelo menos um item no pedido')
    //     .required('O campo items é obrigatório'),
})

export type OrderCreateSchemaInterface = yup.InferType<typeof OrderCreateSchema>


