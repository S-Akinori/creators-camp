import { Material, Pagination } from "@/app/types/Material"
import { cookies } from "next/headers"
import { http } from "../http"
import { User } from "@/app/types/User"

export const getUsers = async (page = 1) : Promise<Pagination<User>> => {
    const res = await http.get(`/users?page=${page}`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `laravel_session=${cookies().get("laravel_session")?.value}`,
        },
    })
    return res.data
}

export const getUser = async (id: number) : Promise<User> => {
    const res = await http.get(`/users/${id}`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `laravel_session=${cookies().get("laravel_session")?.value}`,
        },
    })
    return res.data
}