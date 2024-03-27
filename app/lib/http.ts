import axios from "axios";
import { cookies } from "next/headers";

axios.defaults.withCredentials = true;
export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    withXSRFToken: true,
})