import { Middleware, configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "@/services/category.service";
import userReducer from "@store/slices/userSlice";
import { authApi } from "@/services/auth.service";
import { departmentApi } from "@/services/department.service";

const customMiddleware: Middleware[] = [
    authApi.middleware,
    categoryApi.middleware,
    departmentApi.middleware,
];

export const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(customMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
