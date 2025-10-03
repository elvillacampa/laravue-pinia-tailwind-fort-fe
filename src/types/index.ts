export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    name: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    roles:[]
}


export type Post {
    id: number;
    title?: string;
    content?: string;
    created_at?: string;
    is_published?: boolean;
    slug?: string;
    loading?: boolean;
}

export type postForm = {
    title: string;
    slug: string;
}

export interface LaravelResponseCollection<T>{
    data?: T[];
    current_page?: number;
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    links?: { url: string | null; label: string; active: boolean }[];
    next_page_url?: string | null;
    path?: string;
    per_page?: number;
    prev_page_url?: string | null;
    to?: number;
    total?: number;
    loading?: boolean;  
}