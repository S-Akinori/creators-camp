import { Tag } from "../types/Tag"
import { http } from "./http"

export const getTags = async () : Promise<Tag[]> => {
    const res = await http.get('/tags')
    return res.data
}

export const storeTag = async (name: string) : Promise<Tag> => {
    const res = await http.post('/tags', { name })
    return res.data
}

export const getTag = async (id: number) : Promise<Tag> => {
    const res = await http.get(`/tags/${id}`)
    return res.data
}