import axios from "axios"
import type { AxiosRequestHeaders } from "axios"

interface Params {
    baseURL: string
    headers: AxiosRequestHeaders 
    timeout: number
    withCredentials: boolean
}

const headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json'
} as AxiosRequestHeaders

const config: Params = {
    baseURL: 'http://localhost:8080/api/v1',
    headers: headers,
    timeout: 30000,
    withCredentials: true
}

export default axios.create(config)