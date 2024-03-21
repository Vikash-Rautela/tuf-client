import React from 'react';
import { NavLink } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import Toast from './Toast';

function Nav() {
    const { error, success } = useToast();

    return (
        <>
            <nav className="flex justify-center py-4">
                <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <li>
                        <NavLink exact to="/" className="nav-button bg-gray-200 active:bg-gray-400 px-4 py-2 rounded transition duration-300 block sm:inline-block">Submit Form</NavLink>
                    </li>
                    <li>
                        <NavLink to="/submissions" className="nav-button bg-gray-200 active:bg-gray-400 px-4 py-2 rounded transition duration-300 block sm:inline-block">View Submissions</NavLink>
                    </li>
                </ul>
            </nav>
            {error && <Toast message={error} type="error" />}
            {success && <Toast message={success} type="success" />}
        </>
    );
}

export default Nav;
