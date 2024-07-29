export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    description: string;
    role: string;
    image: string;
    x_link: string;
    website: string;
    skill: string;
    created_game: string;
    contributed_game: string;
    status: 'active' | 'inactive' | 'deleted';
    last_login_at: string;
}