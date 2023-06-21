import { serverApi } from "./serverApi";
import { CategoryResponse } from "@/types/category/CategoryResponse";

export const categoryApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryResponse[], number>({
            query: () => "/category/getAll",
        }),
    }),
    overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoryApi;
