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
        <div className="container mx-auto px-4 m-2">
            <form className="username-form flex flex-col sm:flex-row items-center my-4" onSubmit={handleSubmit}>
                <label className="w-full sm:w-auto">
                    <span className="block mb-2">Username:</span>
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 border rounded m-4"
                />
                <div className="flex w-full sm:w-1/2">
                    <button type='submit' className="bg-blue-500 text-white py-2 px-4 rounded mr-2 w-full">Submit</button>
                    <button type='button' onClick={fetchSubmissions} className="bg-gray-500 text-white py-2 px-4 rounded ml-2 w-full">Refresh</button>
                </div>
            </form>
            <div className="submission-table overflow-x-auto">
                <h2 className="text-xl font-bold mb-4">Submissions</h2>
                <table className="w-full border-collapse border border-gray-400">
                    <thead className="bg-gray-600">
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Serial No</th>
                            <th className="border border-gray-400 px-4 py-2">Code</th>
                            <th className="border border-gray-400 px-4 py-2">Input</th>
                            <th className="border border-gray-400 px-4 py-2">Output</th>
                            <th className="border border-gray-400 px-4 py-2">Language</th>
                            <th className="border border-gray-400 px-4 py-2">Submission Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={index} >
                                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-400 px-4 py-2">{submission.code.slice(0, 100)}</td>
                                <td className="border border-gray-400 px-4 py-2">{submission.stdin}</td>
                                <td className="border border-gray-400 px-4 py-2">{submission.output}</td>
                                <td className="border border-gray-400 px-4 py-2">{languageMap[submission.languageId]}</td>
                                <td className="border border-gray-400 px-4 py-2">{submission.submissionTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmissionTable;
