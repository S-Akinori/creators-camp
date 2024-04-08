import { cookies } from "next/headers"
import { Material, Pagination } from "../types/Material"
import { http } from "./http"

interface Props {
    category_id?: number
    page?: number
    orderBy?: string
}

export const getMaterials = async ({category_id, page, orderBy}: Props = {}) : Promise<Pagination<Material>> => {
    const res = await http.get('/materials', {
        params: {
            category_id,
            page,
            orderBy
        }
    })
    return res.data
}

export const getMaterial = async (id: number) : Promise<Material> => {
    const res = await http.get(`/materials/${id}`)
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