import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for 
import './login.css'
import { Link } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to handle error message
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message
    
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_name: username, password }),
            });
    
            if (!response.ok) {
                throw new Error(`Login failed: ${response.status}`);
            }
    
            // Assuming the response from the server contains the user ID in JSON format
            const userData = await response.json();
            const userId = userData.user.User_id; // Replace 'userId' with the actual key used in the response
            console.log(userData);
            // Save the user ID to localStorage
            localStorage.setItem('userId', userId);
    
            navigate('/'); 
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to login. Please check your credentials.'); // Set error message
        }
    };
    

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}> {/* Added class */}
                <h2 className="login-title">Login</h2> {/* Added class */}
                {error && <div className="error-message">{error}</div>}
                <div className="input-container"> {/* Added container for inputs */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="username-input" // Added class
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="password-input" // Added class
                    />
                </div>
                <button type="submit" className="login-button">Login</button> {/* Added class */}
                <Link to="/" className="return-home-button">Return Home</Link>
            </form>
        </div>
    );
};

export default Login;
