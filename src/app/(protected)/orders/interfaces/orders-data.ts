export interface IOrderItem {
    id: string;
    name: string | null;
    quantity: number;
    price: string;
    subtotal: string;
    product: IProductInfo
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
export interface IProductInfo {
    id: string;
    name: string;
    price: string;
    quantity: number;
    expirationDate: string | null;
    isAvailable: boolean;
    description: string;
    category_id: string | null;
    created_at: string;
    updated_at: string;
}
