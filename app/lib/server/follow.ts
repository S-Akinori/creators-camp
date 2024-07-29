import { Material, Pagination } from "@/app/types/Material"
import { cookies } from "next/headers"
import { http } from "../http"
import { Favorite } from "@/app/types/Favorite"
import { User } from "@/app/types/User"

export const getIsFollowing = async (id: number) : Promise<boolean> => {
    const res = await http.get(`/users/${id}/is-following`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        },
    })
    return res.data.isFollowing
}

export const getFollowings = async (id: number) : Promise<Pagination<User>> => {
    const res = await http.get(`/users/${id}/followings`)
    return res.data
}