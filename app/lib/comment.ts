import { Pagination } from "@/app/types/Material"
import { Comment } from "@/app/types/Comment"
import { http } from "./http"

export const getComment = async (id: number | string) : Promise<Comment> => {
    const res = await http.get(`/comments/${id}`)
    return res.data
}

export const getComments = async (id?: number | string) : Promise<Pagination<Comment>> => {
    const res = await http.get(`/comments`, {
        params: {
            material_id: id,
        },
    })
    return res.data
}