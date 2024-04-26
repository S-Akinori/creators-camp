import { Pagination } from "../types/Material";
import { News } from "../types/News";
import { http } from "./http";

export const getNews = async () : Promise<Pagination<News>> => {
    const res = await http.get('/news')
    return res.data
}

export const getNewsDetail = async (slug: string) : Promise<News> => {
    const res = await http.get(`/news/${slug}`)
    return res.data
}