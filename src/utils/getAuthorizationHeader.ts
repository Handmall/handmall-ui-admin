import { getToken } from "./auth";

export const getAuthorizationHeader = () => {
    const token = getToken();

    if (token) {
        return {
            Authorization: `Bearer ${token || ""}`,
        };
    }

    return null;
};
