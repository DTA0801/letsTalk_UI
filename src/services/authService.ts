import { LoginFormData, SignupFormData, AuthResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const authService = {
    async login(data: LoginFormData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    },

    async signup(data: SignupFormData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Signup failed');
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    },
};