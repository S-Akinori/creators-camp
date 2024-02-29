import axios from "axios";

export const csrf = async () => {
    await axios.get(process.env.NEXT_PUBLIC_WEB_URL + '/sanctum/csrf-cookie', { withCredentials: true });
}