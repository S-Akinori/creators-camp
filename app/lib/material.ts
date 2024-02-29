import { cookies } from "next/headers"
import { Material } from "../types/Material"
import { http } from "./http"

export const getMaterials = async () : Promise<Material[]> => {
    const res = await http.get('/materials')
    return res.data
}

export const getMaterial = async (id: number) : Promise<Material> => {
    const res = await http.get(`/materials/${id}`)
    return res.data
}

export const getUserMaterials = async (id: number) : Promise<Material[]> => {
    const res = await http.get(`/users/${id}/materials`)
    return res.data
}

export const getCategoryMaterials = async (id: number) : Promise<Material[]> => {
    const res = await http.get(`/categories/${id}/materials`)
    return res.data
}