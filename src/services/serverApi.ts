import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const serverApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1",
        prepareHeaders: (headers, { endpoint }) => {
            const userCookie = Cookies.get("user");
            const user = userCookie ? JSON.parse(userCookie) : null;

            if (
                (user && endpoint !== "refresh-token") ||
                endpoint !== "authenticate"
            ) {
                headers.set("Authorization", `Bearer ${user?.accessToken}`);
            }
            return headers;
        },
        credentials: "include",
    }),
    endpoints: () => ({}),
});
