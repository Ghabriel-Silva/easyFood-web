import { IOrder } from "./orders-data";

export interface TableOrdersProps {
    orders: IOrder[];
    page: number;
    rowsPerPage: number;
    handleChangePage: (_event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updateOrderStatus: (orderId: string, novoStatus: string) => void;
}
