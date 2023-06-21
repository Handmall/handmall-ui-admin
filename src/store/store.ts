import { categoryApi } from "@/services/category.service";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
