import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // useNavigate for redirection
import '../login/login.css'
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        console.log(username);
        event.preventDefault();
        setError(''); // Reset error message

        try {
            console.log("username ", username)
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_name: username, password }),
            });

            if (!response.ok) {
                throw new Error(`Registration failed: ${response.status}`);
            }
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration error:', error);
            setError('Username taken. Please choose another username.'); 
        }
    };

    return (
        <div className="login-container"> {}
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Register</h2> {}
                {error && <div className="error-message">{error}</div>}
                <div className="input-container">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="username-input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="password-input"
                    />
                </div>
                <button type="submit" className="login-button">Register</button> {}
                <Link to="/" className="return-home-button">Return Home</Link>
            </form>
        </div>
    );
};

export default Register;
