import { getRefreshToken } from "@/utils/auth.ts";
import axios, { AxiosInstance } from "axios";

export class AuthService {
    protected readonly instance: AxiosInstance;
    public constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Time out!",
        });
    }

    login = (identifier: string, password: string) => {
        return this.instance
            .post("/authenticate", {
                identifier,
                password,
            })
            .then((res) => {
                if (res.status === 200) {
                    return {
                        username: res.data.username,
                        role: res.data.role,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                        jwtExpiredAt: res.data.jwtExpiredAt,
                        refreshExpiredAt: res.data.refreshExpiredAt,
                    };
                } else {
                    return null;
                }
            })
            .catch((error) => console.log(error.res));
    };

    refreshToken = () => {
        const refreshTokenValue = getRefreshToken();
        return this.instance
            .post(
                "/refresh-token",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${refreshTokenValue}`,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    return {
                        email: res.data.email,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                        jwtExpiredAt: res.data.jwtExpiredAt,
                        refreshExpiredAt: res.data.refreshExpiredAt,
                    };
                } else {
                    return null;
                }
            })
            .catch((error) => console.log(error.res));
    };
}

export const authService = new AuthService("http://localhost:8080/api/v1/auth");
