import { Pagination } from "../types/Material";
import { http } from "./http";

export const search = async <T,>(query: string, searchType: string, category_id = 0): Promise<Pagination<T>> => {
    const response = await http.get(`/search?query=${query}&type=${searchType}&category_id=${category_id}`);
    return response.data;
}