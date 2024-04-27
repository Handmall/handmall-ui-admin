import { authService } from "@services/auth.service.ts";
import { LoginResponse } from "@/types/auth/LoginResponse.ts";
import { setToken } from "@/utils/auth";

export const useLogin = () => {
    const login = async (email: string, password: string) => {
        const user = await authService.login(email, password);

        if (user) {
            setToken(user);
        }

        return user as LoginResponse;
    };

    return { login };
};
