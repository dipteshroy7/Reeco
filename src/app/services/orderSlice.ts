import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { OrderItem, OrderState, textColor } from "./orderApi";

const initialState: OrderState = {
    user_name: "",
    order_number: "",
    shipping_date: "",
    department: "",
    supplier: "",
    status: "",
    order_items: [],
    searched_order_items: [],
    missing_modal_id: null,
    edit_modal_id: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderDetails(state, action: PayloadAction<OrderState>) {
            const {
                user_name,
                order_number,
                shipping_date,
                department,
                supplier,
                status,
                order_items,
            } = action.payload;
            state.user_name = user_name;
            state.order_number = order_number;
            state.shipping_date = shipping_date;
            state.department = department;
            state.supplier = supplier;
            state.status = status;
            state.order_items = order_items;
        },
        updateOrderItemStatus(
            state,
            action: PayloadAction<{ id: number; text: string; type: textColor }>
        ) {
            const { id, text, type } = action.payload;
            state.order_items[id].statusText = text;
            state.order_items[id].statusType = type;
        },
        updateMissingModalId(state, action: PayloadAction<number | null>) {
            state.missing_modal_id = action.payload;
        },
        updateEditModalId(state, action: PayloadAction<number | null>) {
            state.edit_modal_id = action.payload;
        },
        updateOrderItemPrice(state, action: PayloadAction<{ id: number; updatedPrice: number }>) {
            const { id, updatedPrice } = action.payload;
            state.order_items[id].price = updatedPrice;
        },
        updateOrderItemOldPrice(
            state,
            action: PayloadAction<{ id: number; updatedOldPrice: number | null }>
        ) {
            const { id, updatedOldPrice } = action.payload;
            state.order_items[id].old_price = updatedOldPrice;
        },
        updateOrderItemQuantity(
            state,
            action: PayloadAction<{ id: number; updatedQuantity: number }>
        ) {
            const { id, updatedQuantity } = action.payload;
            state.order_items[id].quantity = updatedQuantity;
        },
        updateOrderItemOldQuantity(
            state,
            action: PayloadAction<{ id: number; updatedOldQuantity: number | null }>
        ) {
            const { id, updatedOldQuantity } = action.payload;
            state.order_items[id].old_quantity = updatedOldQuantity;
        },
        updateOrderItemTotalPrice(
            state,
            action: PayloadAction<{ id: number; updatedTotalPrice: number }>
        ) {
            const { id, updatedTotalPrice } = action.payload;
            state.order_items[id].total_price = updatedTotalPrice;
        },
        updateOrderItemOldTotalPrice(
            state,
            action: PayloadAction<{
                id: number;
                updatedOldTotalPrice: number | null;
            }>
        ) {
            const { id, updatedOldTotalPrice } = action.payload;
            state.order_items[id].old_total_price = updatedOldTotalPrice;
        },
        updateOrderItemReason(state, action: PayloadAction<{ id: number; updatedReason: string }>) {
            const { id, updatedReason } = action.payload;
            state.order_items[id].reason = updatedReason;
        },
        updateSearchedOrderDetails(state, action: PayloadAction<OrderItem[]>) {
            state.searched_order_items = action.payload;
        },
        updateOrderStatus(state, action: PayloadAction<string>) {
            state.status = action.payload;
        },
        addDemoOrderItem(state) {
            state.order_items.push({
                id: state.order_items.length,
                name: "Demo Item",
                image: "/assets/images/Avocado.jpg",
                brand: "Demo Brand",
                price: 10,
                total_price: 10,
                quantity: 1,
                old_price: null,
                old_total_price: null,
                old_quantity: null,
                weight: "1LB",
                statusText: "",
                statusType: undefined,
                reason: "",
            });
        },
    },
});

export const {
    setOrderDetails,
    updateOrderItemStatus,
    updateMissingModalId,
    updateEditModalId,
    updateOrderItemPrice,
    updateOrderItemOldPrice,
    updateOrderItemQuantity,
    updateOrderItemOldQuantity,
    updateOrderItemTotalPrice,
    updateOrderItemOldTotalPrice,
    updateOrderItemReason,
    updateSearchedOrderDetails,
    updateOrderStatus,
    addDemoOrderItem,
} = orderSlice.actions;

export const getOrderDetails = (state: RootState) => state.order;

export default orderSlice.reducer;
