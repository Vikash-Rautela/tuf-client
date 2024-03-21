import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const SubmissionForm = () => {
    const [username, setUsername] = useState('');
    const [codeLanguage, setCodeLanguage] = useState('52');
    const [stdin, setStdin] = useState('');
    const [sourceCode, setSourceCode] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, setLoading] = useState(false);
    const { showError, showSuccess } = useToast();

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername && rememberMe) {
            setUsername(savedUsername);
        }
    }, [rememberMe]);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
        if (!rememberMe) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            username: username,
            code: sourceCode,
            languageId: codeLanguage,
            stdin: stdin
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/submissions`, formData);
            console.log('Form data submitted successfully:', response.data);
            showSuccess('Form data submitted successfully');
            setUsername('');
            setCodeLanguage('52');
            setStdin('');
            setSourceCode('');
        } catch (error) {
            console.error('Error submitting form data:', error);
            showError('Error submitting form data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="max-w-lg mx-auto mt-8 m-2 p-6 bg-gray-300 border rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block mb-2">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="rememberMe" className="flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                        className="mr-2"
                    />
                    <span>Remember Me</span>
                </label>
            </div>
            <div className="mb-4">
                <label htmlFor="codeLanguage" className="block mb-2">Preferred Code Language:</label>
                <select
                    id="codeLanguage"
                    value={codeLanguage}
                    onChange={(e) => setCodeLanguage(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="52">C++ (GCC 7.4.0)</option>
                    <option value="91">Java (JDK 17.0.6)</option>
                    <option value="93">JavaScript (Node.js 18.15.0)</option>
                    <option value="71">Python (3.8.1)</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="stdin" className="block mb-2">Standard Input (stdin):</label>
                <textarea
                    id="stdin"
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="sourceCode" className="block mb-2">Source Code:</label>
                <textarea
                    id="sourceCode"
                    value={sourceCode}
                    onChange={(e) => setSourceCode(e.target.value)}
                    required
                    rows={sourceCode.split('\n').length + 1}
                    className="w-full p-2 border rounded"
                    style={{ minHeight: '100px' }}
                />
            </div>
            {loading ? (
                <button type="button" disabled className="bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed">Submitting...</button>
            ) : (
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
            )}
        </form>
    );
};

export default SubmissionForm;
