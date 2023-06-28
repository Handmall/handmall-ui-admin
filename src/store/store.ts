import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "@/services/category.service";
import userReducer from "@store/slices/userSlice";
import { authApi } from "@/services/auth.service";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            categoryApi.middleware,
            authApi.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
