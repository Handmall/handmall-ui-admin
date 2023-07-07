import { getToken } from "@/utils/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serverApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1",
        prepareHeaders: (headers, { endpoint }) => {
            const token = getToken();
            console.log(endpoint);
            if (token && endpoint !== "login") {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
        credentials: "include",
    }),
    endpoints: () => ({}),
});
