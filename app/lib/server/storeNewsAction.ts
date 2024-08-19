import Axios from "axios";
import { csrf } from "../csrf";
import { http } from "../http";
import { storeNews } from "./news";

export const storeNewsAction = async (formData: FormData) => {
    await csrf();
    try {
        const data = await storeNews(formData);
        return data;
    } catch (e) {
        if (Axios.isAxiosError(e) && e.response) {
            const data = e.response.data
            return data
        }
    }
}