import { checkAuth, getToken } from "@/utils/auth.ts";
import { getAuthorizationHeader } from "@/utils/getAuthorizationHeader.ts";
import axios from "axios";

interface Params {
    baseURL: string;
    headers: any;
    timeout: number;
    withCredentials: boolean;
}

const config: Params = {
    baseURL: "http://localhost:8080/api/v1",
    headers: getAuthorizationHeader(),
    timeout: 30000,
    withCredentials: true,
};

const ax = axios.create(config);

ax.interceptors.request.use(
    (req) => {
        const isAuth = checkAuth();
        if (isAuth == true) {
            const token = getToken();
            if (token) {
                req.headers.Authorization = `Bearer ${token || ""}`;
                return req;
            }
            return req;
        }
        return req;
    },
    (error) => {
        const status = error.response ? error.response.status : null;
        const req = error.config;
        if (status == 401) {
            req._retry = true;
        } else if (status == 403) {
            req._retry = true;
        }
        return Promise.reject(error);
    }
);

export default ax;
