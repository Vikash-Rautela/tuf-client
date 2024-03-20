import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Submit Form</Link>
                </li>
                <li>
                    <Link to="/submissions">View Submissions</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav