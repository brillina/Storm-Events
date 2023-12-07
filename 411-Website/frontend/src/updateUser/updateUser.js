import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './updateUser.css'

const UpdateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showFindUserButton, setShowFindUserButton] = useState(true);
    
    const navigate = useNavigate();

    const fetchUserByUsernameAndPassword = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_name: username, password }),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("data.user ", data.user);
            setUserId(data.user.User_id);

            setSuccess('User successfully found');
            setShowFindUserButton(false);
        } catch (error) {
            console.error('Fetch user error:', error);
            setError('Failed to fetch user. Please try again.');
        }
    };

    const handleUpdate = async () => {
        await fetchUserByUsernameAndPassword();

        if (!userId) {
            setError('User not found.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_name: newUsername, password: newPassword }),
            });

            if (!response.ok) {
                throw new Error(`Update failed: ${response.status}`);
            }

            setSuccess('User information updated successfully.');
        } catch (error) {
            console.error('Update error:', error);
            setError('Failed to update user information. Please try again.');
        }
    };

    const handleDelete = async () => {
        await fetchUserByUsernameAndPassword();

        if (!userId) {
            setError('User not found.');
            return;
        }

        if (!window.confirm(`Are you sure you want to delete this user?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Deletion failed: ${response.status}`);
            }

            setSuccess('User deleted successfully.');
        } catch (error) {
            console.error('Delete error:', error);
            setError('Failed to delete user. Please try again.');
        }
    };

    return (
        <div className="login-container"> {}

            
            <form className="login-form"> {}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <h2 className="login-title">Update/Delete User</h2> {}
            

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
                    {showFindUserButton && <button type="button" onClick={fetchUserByUsernameAndPassword} className="login-button">Find User</button>}
                </div>
                {userId && (
                    <div className="update-form">
                        {success && (
                            <div>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    placeholder="New Username"
                                    className="username-input"
                                />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    className="password-input"
                                />
                                <button type="button" onClick={handleUpdate} className="login-button">Update User Password</button>
                                <button type="button" onClick={handleDelete} className="delete-button">Delete User</button>
                            </div>
                        )}
                    </div>
                )}
                            <Link to="/" className="return-home-button">Go Back to Home</Link> {}

            </form>
        </div>
    );
};

export default UpdateUser;
