export interface PermissionToken {
    id: number | string;
    user_id: number | string;
    material_id: number | string;
    token: string;
    created_at: string;
    updated_at: string;
    is_approved: 0 | 1 | boolean;
    is_active: 0 | 1 | boolean;
}