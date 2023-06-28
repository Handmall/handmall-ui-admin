import { LoginResponse } from "@/types/auth/LoginResponse";
import { serverApi } from "./serverApi";
import { LoginRequest } from "@/types/auth/LoginRequest";

export const authApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => {
                return {
                    url: "/auth/authenticate",
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
