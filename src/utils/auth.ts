import { LoginResponse } from "@/types/auth/LoginResponse";
import Cookies from "js-cookie";

export const getToken = () => {
    const userCookie: string | undefined = Cookies.get("user");
    let token: string | null;
    let user: LoginResponse | null;

    userCookie ? (user = JSON.parse(userCookie)) : (user = null);
    user ? (token = user.accessToken) : (token = null);

    return token;
};

export const getUser = () => {
    const userCookie: string | undefined = Cookies.get("user");
    let user: LoginResponse | null;

    userCookie ? (user = JSON.parse(userCookie)) : (user = null);

    return user;
};

export const removeToken = () => {
    Cookies.remove("user");
};

export const setToken = (val: LoginResponse) => {
    Cookies.set("user", JSON.stringify(val));
};
