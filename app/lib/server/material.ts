import { Material, Pagination } from "@/app/types/Material"
import { cookies } from "next/headers"
import { http } from "../http"
import { Favorite } from "@/app/types/Favorite"

export const getMaterial = async (id: number) : Promise<Material> => {
    const res = await http.get(`/materials/${id}`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        },
    })
    return res.data
}


export const getUserFavoriteMaterials = async () : Promise<Pagination<Favorite>> => {
    const res = await http.get(`/user/favorites`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        },
    })
    return res.data
}

export const getCategoryMaterials = async (id: number) : Promise<Material[]> => {
    const res = await http.get(`/categories/${id}/materials`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        },
    })
    return res.data
}