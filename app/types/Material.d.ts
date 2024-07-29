import { Category } from "./Category";
import { PermissionToken } from "./PermissionToken";
import { Tag } from "./Tag";
import { User } from "./User";

export interface Material {
    id: number;
    name: string;
    description: string;
    category_id: number;
    category: Category;
    permission: number;
    file: string;
    image: string;
    images: string[]
    status: 'active' | 'inactive' | 'deleted';
    user: User
    user_id: number;
    created_at: string;
    updated_at: string;
    likes: any[]
    favorites: any[]
    permission_tokens: PermissionToken[]
    download_count: number
    like_count: number
    favorite_count: number
    tags: Tag[]
    is_ai_generated: number
}

export interface MaterialError {
    name?: string[];
    description?: string[];
    category_id?: string[];
    permission?: string[];
    file?: string[];
    image?: string[];
    tag?: string[];
    is_ai_generated?: string[];
}

export interface Pagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null, label: string, active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}