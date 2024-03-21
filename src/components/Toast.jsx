import React from 'react';

const Toast = ({ message, type }) => {
    const toastClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    return (
        <div className={`fixed bottom-4 right-4 text-white py-2 px-4 rounded ${toastClass}`}>
            {message}
        </div>
    );
};

export default Toast;
