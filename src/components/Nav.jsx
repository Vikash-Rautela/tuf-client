import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="flex justify-center py-4">
            <ul className="flex space-x-4">
                <li>
                    <NavLink exact to="/" className="nav-button" activeClassName="active">Submit Form</NavLink>
                </li>
                <li>
                    <NavLink to="/submissions" className="nav-button" activeClassName="active">View Submissions</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
