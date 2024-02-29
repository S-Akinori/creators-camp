import { Category } from "../types/Category"
import { http } from "./http"

export const getCategories = async () : Promise<Category[]> => {
    const res = await http.get('/categories')
    return res.data
}

export const getCategory = async (id: number) : Promise<Category> => {
    const res = await http.get(`/categories/${id}`)
    return res.data
}