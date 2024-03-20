import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmissionForm = () => {
    const [username, setUsername] = useState('');
    const [codeLanguage, setCodeLanguage] = useState('52'); // Defaulting to C++
    const [stdin, setStdin] = useState('');
    const [sourceCode, setSourceCode] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

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

        const formData = {
            username: username,
            code: sourceCode,
            languageId: codeLanguage,
            stdin: stdin
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/submissions`, formData); // <--- Corrected line
            console.log('Form data submitted successfully:', response.data);
            setUsername('');
            setCodeLanguage('52');
            setStdin('');
            setSourceCode('');
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="rememberMe">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                    />
                    Remember Me
                </label>
            </div>
            <div>
                <label htmlFor="codeLanguage">Preferred Code Language:</label>
                <select
                    id="codeLanguage"
                    value={codeLanguage}
                    onChange={(e) => setCodeLanguage(e.target.value)}
                    required
                >
                    <option value="52">C++ (GCC 7.4.0)</option>
                    <option value="91">Java (JDK 17.0.6)</option>
                    <option value="93">JavaScript (Node.js 18.15.0)</option>
                    <option value="71">Python (3.8.1)</option>
                </select>
            </div>
            <div>
                <label htmlFor="stdin">Standard Input (stdin):</label>
                <textarea
                    id="stdin"
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="sourceCode">Source Code:</label>
                <textarea
                    id="sourceCode"
                    value={sourceCode}
                    onChange={(e) => setSourceCode(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SubmissionForm;
