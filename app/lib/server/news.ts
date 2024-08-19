import { cookies } from "next/headers"
import { http } from "../http"
import { News } from "@/app/types/News"

export const storeNews = async (formdata: FormData) : Promise<News> => {
    const res = await http.post(`/news`, formdata, {
        headers: {
            referer: process.env.APP_URL,
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
        },
    })
    return res.data
}

export const getNewsBySlug = async (slug: string) : Promise<News> => {
    const res = await http.get(`/news/${slug}`)
    return res.data
}