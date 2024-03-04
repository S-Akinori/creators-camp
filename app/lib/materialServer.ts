import { cookies } from "next/headers"
import { Material } from "../types/Material"
import { http } from "./http"
import Axios from "axios"

export const getMaterial = async (id: number) : Promise<Material> => {
    const res = await fetch(`${process.env.API_URL}/materials/${id}`, {
        headers: {
            Cookie: `laravel_session=${
                cookies().get("laravel_session")?.value
            }`,
            referer: "http://localhost:3000",
        },
        credentials: "include",
    })
    const data = await res.json()
    return data
}