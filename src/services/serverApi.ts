import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serverApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1" }),
    endpoints: () => ({}),
});
