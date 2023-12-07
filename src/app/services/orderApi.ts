import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OrderState {
    user_name: string;
    order_number: string;
    shipping_date: string;
    department: string;
    supplier: string;
    status: string;
    order_items: OrderItem[];
    searched_order_items: OrderItem[];
    missing_modal_id: number | null;
    edit_modal_id: number | null;
}

export type textColor = "green" | "orange" | "red";

export interface OrderItem {
    id: number;
    name: string;
    image: string;
    brand: string;
    price: number;
    total_price: number;
    quantity: number;
    old_price: number | null;
    old_total_price: number | null;
    old_quantity: number | null;
    weight: string;
    statusText: string;
    statusType: textColor | undefined;
    reason: string;
}

export const orderApiSlice = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/data" }),
    endpoints: (builder) => ({
        getOrderDetails: builder.query<OrderState, void>({
            query: () => "/orderDetails.json",
        }),
    }),
});

export const { useGetOrderDetailsQuery } = orderApiSlice;
