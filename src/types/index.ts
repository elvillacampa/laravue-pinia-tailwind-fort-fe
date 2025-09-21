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
}