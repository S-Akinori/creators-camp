import axios from "axios";

axios.defaults.withCredentials = true;
export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    withXSRFToken: true,
})