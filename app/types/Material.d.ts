import { User } from "./User";

export interface Material {
    id: number;
    name: string;
    description: string;
    category_id: number;
    permission: number;
    file: string;
    image: string;
    user: User
    user_id: number;
    created_at: string;
    updated_at: string;
    likes: any[]
    favorites: any[]
}

export interface MaterialError {
    name?: string[];
    description?: string[];
    category_id?: string[];
    permission?: string[];
    file?: string[];
    image?: string[];
}