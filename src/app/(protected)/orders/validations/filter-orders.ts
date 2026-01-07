import * as yup from "yup";

export enum OrderStatus {
    PENDING = "Pendente",
    PREPARING = "Preparando",
    COMPLETED = "Completo",
    DELIVERED = "Entregue",
    CANCELLED = "Cancelado",
}

export enum PaymentMethod {
    CASH = "Dinheiro",
    CARD = "Cartão",
    PIX = "Pix",
    OTHER = "Outros"
}

export const filterOrderSchema = yup.object({
    status: yup
        .array()
        .of(yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus), "Status deve ter um dos valores a seguir: ['Pendente,Preparando,Completo,Entregue,Cancelado']"))
        .min(0, "É necessário pelo menos um status")
        .typeError("Defina um valor válido para o status")
        .notRequired(),

    paymentMethod: yup
        .array()
        .of(yup.mixed<PaymentMethod>().oneOf(Object.values(PaymentMethod), "Forma de pagamento deve ter um dos valores a seguir: Dinheiro, Cartão, Pix, Outros"))
        .min(0, "É necessário pelo menos um metodo de pagamento")
        .typeError("Defina um valor válido para o forma de pagamento")
        .notRequired(),

    startDate: yup
        .date()
        .typeError('Data inválida')
        .nullable()
        .notRequired()
        .transform((_, originalValue) => (originalValue ? new Date(originalValue) : null)),

    finalDate: yup
        .date()
        .typeError('Data inválida')
        .nullable()
        .notRequired()
        .transform((_, originalValue) => (originalValue ? new Date(originalValue) : null))
        .when('startDate', (startDate, schema) => {
            if (startDate instanceof Date && !isNaN(startDate.getTime())) {
                return schema.min(startDate, "A data final não pode ser menor que a inicial")
            }
            return schema
        }),

    clientName: yup
        .string()
        .typeError('O nome dever ser apenas letras')
        .notRequired()
})
export type FilterOrderSchemaInterface = yup.InferType<typeof filterOrderSchema>