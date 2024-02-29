import { Material } from "@/app/types/Material"
import { cookies } from "next/headers"
import { http } from "../http"

export const getMaterial = async (id: number) : Promise<Material> => {
    const res = await http.get(`/materials/${id}`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `laravel_session=${cookies().get("laravel_session")?.value}`,
        },
    })
    return res.data
}

export const getCategoryMaterials = async (id: number) : Promise<Material[]> => {
    const res = await http.get(`/categories/${id}/materials`, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `laravel_session=${cookies().get("laravel_session")?.value}`,
        },
    })
    return res.data
}