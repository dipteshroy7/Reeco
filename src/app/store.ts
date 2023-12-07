import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { orderApiSlice } from "./services/orderApi";
import orderReducer from "./services/orderSlice";

export const store = configureStore({
    reducer: {
        [orderApiSlice.reducerPath]: orderApiSlice.reducer,
        order: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(orderApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
