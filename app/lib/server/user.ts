import { Material, Pagination } from "@/app/types/Material"
import { cookies } from "next/headers"
import { http } from "../http"
import { User } from "@/app/types/User"

interface Props {
    search?: string
    role?: string
    page?: number
}

export const getUsers = async ({search, role, page}: Props = {}) : Promise<Pagination<User>> => {
    const res = await http.get(`/users?page=${page}`, {
        params: {
            search,
            role,
        },
        headers: {
            referer: process.env.APP_URL,
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        },
    })
    return res.data
}

export const getUser = async (id: number) : Promise<User> => {
    const res = await http.get(`/users/${id}`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        },
    })
    return res.data
}