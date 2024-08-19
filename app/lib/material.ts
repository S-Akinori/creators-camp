import { cookies } from "next/headers"
import { Material, Pagination } from "../types/Material"
import { http } from "./http"

interface Props {
    user_id?: number
    category_id?: number
    page?: number
    orderBy?: string
    search?: string
    tag_id?: number
    except_ai?: number
}

export const getMaterials = async ({user_id, category_id, search, tag_id, except_ai, page, orderBy}: Props = {}) : Promise<Pagination<Material>> => {
    const res = await http.get('/materials', {
        params: {
            user_id: user_id,
            category_id: category_id,
            search: search,
            tag_id: tag_id,
            except_ai: except_ai,
            page: page,
            order_by: orderBy
        },
        // headers: {
        //     referer: process.env.APP_URL,
        //     Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        // },
    })
    return res.data
}

export const getMaterial = async (id: number) : Promise<Material> => {
    const res = await http.get(`/materials/${id}`)
    return res.data
}

export const getMaterialsByTagId = async (id: number|string) : Promise<Pagination<Material>> => {
    const res = await http.get(`/materials/tag/${id}`)
    return res.data
}

export const getUserMaterials = async (id: number) : Promise<Pagination<Material>> => {
    const res = await http.get(`/users/${id}/materials`)
    return res.data
}

export const getCategoryMaterials = async (id: number) : Promise<Material[]> => {
    const res = await http.get(`/categories/${id}/materials`)
    return res.data
}