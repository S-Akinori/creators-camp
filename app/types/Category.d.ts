export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
    materials: Material[];
}