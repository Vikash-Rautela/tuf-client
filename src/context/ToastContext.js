import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const showError = (message) => {
        setError(message);
        setTimeout(() => setError(null), 5000); // Hide error message after 5 seconds
    };

    const showSuccess = (message) => {
        setSuccess(message);
        setTimeout(() => setSuccess(null), 5000); // Hide success message after 5 seconds
    };

    return (
        <ToastContext.Provider value={{ error, showError, success, showSuccess }}>
            {children}
        </ToastContext.Provider>
    );
};
