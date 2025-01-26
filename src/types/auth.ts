export interface LoginFormData {
    email: string;
    password: string;
}

export interface SignupFormData extends LoginFormData {
    username: string;
    confirmPassword: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        username: string;
    };
}

export interface ValidationErrors {
    email?: string;
    password?: string;
    username?: string;
    confirmPassword?: string;
}