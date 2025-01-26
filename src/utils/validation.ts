import { LoginFormData, SignupFormData, ValidationErrors } from '../types/auth';

export const validateLogin = (data: LoginFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    return errors;
};

export const validateSignup = (data: SignupFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!data.username) {
        errors.username = 'Username is required';
    } else if (data.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }

    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};