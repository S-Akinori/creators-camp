import { Material } from "./Material";

interface Favorite {
    id: number | string;
    user_id: number | string;
    material_id: number | string;
    created_at: string;
    updated_at: string;
    material: Material;
}