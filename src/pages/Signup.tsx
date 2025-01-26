import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignupFormData, ValidationErrors } from '../types/auth';
import { validateSignup } from '../utils/validation';
import { authService } from '../services/authService';
import '../styles/auth.css';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<SignupFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = React.useState<ValidationErrors>({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>('');

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
        const validationErrors = validateSignup(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.signup(formData);
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
                <h1>Sign Up</h1>
                
                {apiError && (
                    <div className="error-message" style={{ marginBottom: '1rem' }}>
                        {apiError}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                    />
                    {errors.username && <div className="error-message">{errors.username}</div>}
                </div>

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
                        placeholder="Create a password"
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                        <div className="error-message">{errors.confirmPassword}</div>
                    )}
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="loading-spinner"></span>
                            Creating account...
                        </>
                    ) : 'Sign Up'}
                </button>

                <Link to="/login" className="auth-link">
                    Already have an account? Login
                </Link>
            </form>
        </div>
    );
};

export default Signup;
