import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toastErr } from './api';
import '../../styles/css/errorState.css';

/**
 * Error state component with retry functionality
 * @param {Object} props
 * @param {Error|null} props.error - The error object
 * @param {Function} props.onRetry - Function to call when retry button is clicked
 * @param {string} props.message - Custom error message (optional)
 * @param {boolean} props.navigateToProjects - If true, button navigates to /projects instead of retrying
 */
const ErrorState = ({ error, onRetry, message = null, navigateToProjects = false }) => {
    const navigate = useNavigate();
    const errorMessage = message || (error?.message || 'Something went wrong. Please try again.');

    const handleRetry = () => {
        if (navigateToProjects) {
            navigate('/projects');
        } else if (onRetry) {
            onRetry();
        } else {
            // Fallback: reload the page
            window.location.reload();
        }
    };

    return (
        <div className="error-state" role="alert">
            <div className="error-icon">
                <svg
                    width="110"
                    height="110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <h2>Oops! Something went wrong</h2>
            <p>{errorMessage}</p>
            <button className="halo error-retry-button" onClick={handleRetry} aria-label={navigateToProjects ? "Go to projects page" : "Retry loading content"}>
                {navigateToProjects ? 'Back to Projects' : 'Try Again'}
            </button>
        </div>
    );
};

export default ErrorState;

