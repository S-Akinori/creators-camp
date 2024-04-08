import { Category } from "../types/Category"
import { Material, Pagination } from "../types/Material"
import { http } from "./http"

export const getCategories = async () : Promise<Category[]> => {
    const res = await http.get('/categories')
    return res.data
}

export const getCategory = async (id: number, page = 1, orderBy = 'download_count') : Promise<{category:Category, materialsPagination:Pagination<Material>}> => {
    const res = await http.get(`/categories/${id}?page=${page}&order_by=${orderBy}`)
    const category = res.data.category as Category
    const materialsPagination = res.data.materials as Pagination<Material>
    return {'category': category, 'materialsPagination': materialsPagination}
}