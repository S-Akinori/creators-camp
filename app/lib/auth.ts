'use server'
import { cookies } from "next/headers";
import { http } from "./http";
import { setCookie } from "nookies";
import { User } from "../types/User";

interface RegisterProps {
    name: FormDataEntryValue| string | null;
    email: FormDataEntryValue| string | null;
    password: FormDataEntryValue| string | null;
    password_confirmation: FormDataEntryValue| string | null;
}

export const register = async ({name, email, password, password_confirmation}: RegisterProps) => {
    const res = await http.post('/register', {
        name,
        email,
        password,
        password_confirmation
    })
    return res
}

interface LoginProps {
    email: FormDataEntryValue| string | null;
    password: FormDataEntryValue| string | null;
}
export const login = async ({email, password}: LoginProps) => {
    const res = await http.post('/login', {
        email,
        password
    }, {
        headers: {
            'Accept': 'application/json'
        }
    })
    return res
}

export const logout = async () => {
    const res = await http.post('/logout')
    return res
}

export const getUser = async (): Promise<User> => {
    // const res = await http.get('/user')
    const res = await http.get(`/user`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `laravel_session=${cookies().get("laravel_session")?.value}`,
        },
    })
    return res.data;
}