import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginFormData, ValidationErrors } from '../types/auth';
import { validateLogin } from '../utils//validation';
import { authService } from '../services/authService';
import '../styles/auth.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear errors when user starts typing
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
        setApiError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate form
        const validationErrors = validateLogin(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.login(formData);
            // Store token in localStorage or your preferred storage method
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            // Redirect to home page or dashboard
            navigate('/dashboard');
        } catch (error) {
            setApiError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                
                {apiError && (
                    <div className="error-message" style={{ marginBottom: '1rem' }}>
                        {apiError}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="loading-spinner"></span>
                            Logging in...
                        </>
                    ) : 'Login'}
                </button>

                <Link to="/signup" className="auth-link">
                    Don't have an account? Sign up
                </Link>
            </form>
        </div>
    );
};

export default Login;
