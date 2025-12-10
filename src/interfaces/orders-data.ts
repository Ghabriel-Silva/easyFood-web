export interface IOrderItem {
    id: string;
    name: string | null;
    quantity: number;
    price: string;
    subtotal: string;
}

export interface IOrder {
    id: string;
    customerName: string | null;
    customerAddress: string | null;
    customerPhone: string | null;
    status: string;
    paymentMethod: string;
    isFreightApplied: boolean;
    customFreight: string;
    totalFreight: string;
    additionalValue: string;
    discountValue: string;
    total: string;
    created_at: string;
    updated_at: string;
    items: IOrderItem[];
}
export interface IOrderResponse {
    message: string,
    cache: null,
    data: IOrder[]
}