import { Material } from "./Material";
import { User } from "./User";

export interface Comment {
    id: number|string;
    user_id: number|string;
    material_id: number|string;
    content: string;
    created_at: string;
    updated_at: string;
    status: 'active' | 'inactive' | 'deleted';
    user: User;
    material: Material;
}