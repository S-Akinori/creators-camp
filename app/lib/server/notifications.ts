import { cookies } from "next/headers"
import { http } from "../http"
import { News } from "@/app/types/News"
import { Pagination } from "@/app/types/Material"

interface Notification {
    id: number;
    type: string;
    data: any;
    read: boolean;
  }

export const getAllNotifications = async () : Promise<Pagination<Notification>> => {
    const res = await http.get(`/notifications/all`,
        {
            headers: {
                referer: process.env.APP_URL,
                Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
            },
        }
    )
    return res.data
}