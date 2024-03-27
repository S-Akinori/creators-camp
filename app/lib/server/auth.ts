'use server'

import { cookies } from "next/headers"
import { http } from "../http"
import { csrf } from "../csrf"

export const update = async (data: FormData) => {
    await csrf()
    try {
        const res = await http.put('/user/profile-information', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                referer: process.env.APP_URL,
                Cookie: `laravel_session=${cookies().get("laravel_session")?.value}`,
            },
            withXSRFToken: true
        })
        return res.data
    } catch (e) {
        console.error(e)
    }
}