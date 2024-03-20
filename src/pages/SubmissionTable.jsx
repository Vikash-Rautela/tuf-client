import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmissionTable = () => {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [submissions, setSubmissions] = useState([]);
    const languageMap = {
        52: 'C++ (GCC 7.4.0)',
        91: 'Java (JDK 17.0.6)',
        93: 'JavaScript (Node.js 18.15.0)',
        71: 'Python (3.8.1)'
    }
    useEffect(() => {
        fetchSubmissions(); // eslint-disable-next-line
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/submissions?username=${username}`);
            setSubmissions(response.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim()) {
            await fetchSubmissions();
        }
    };

    return (
        <div className="container">
            <form className="username-form" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={fetchSubmissions}>Refresh</button>
                </label>
            </form>
            <div className="submission-table">
                <h2>Submissions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Code</th>
                            <th>Input</th>
                            <th>Output</th>
                            <th>Language</th>
                            <th>Submission Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{submission.code.slice(0, 100)}</td>
                                <td>{submission.stdin}</td>
                                <td>{submission.output}</td>
                                <td>{languageMap[submission.languageId]}</td>
                                <td>{submission.submissionTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmissionTable;
