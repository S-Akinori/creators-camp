import { Material, Pagination } from "@/app/types/Material"
import { cookies } from "next/headers"
import { http } from "../http"
import { Favorite } from "@/app/types/Favorite"
import { Comment } from "@/app/types/Comment"

export const getComment = async (id: number | string) : Promise<Comment> => {
    const res = await http.get(`/comments/${id}`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        },
    })
    return res.data
}

export const getComments = async (id?: number | string) : Promise<Pagination<Comment>> => {
    const res = await http.get(`/comments`, {
        params: {
            material_id: id,
        },
        headers: {
            referer: process.env.APP_URL,
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        },
    })
    return res.data
}