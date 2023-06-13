export interface LoginResponse {
    accessToken: string
    refreshToken: string
    accessExpireTime: string
    refreshExpireTime: string
    role: string
}