import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [registrationMessage, setRegistrationMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === repeatPassword);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            try {
                const response = await axios.post('/api/user/register', {
                    name: fullName,
                    email,
                    password,
                });

                // Handle the response
                setRegistrationMessage('Registration successful. Redirecting to login page.');
                setTimeout(() => {
                    navigate('/'); // Use navigate to redirect to the login page
                }, 2000); // Redirect after 2 seconds
            } catch (error) {
                // Handle registration error
                setRegistrationMessage('Registration failed. Please try again.');
                console.error(error);
            }
        } else {
            setPasswordsMatch(false);
            setRegistrationMessage('Passwords do not match.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Create an Account</h2>
                {registrationMessage && (
                    <div className={`text-center ${registrationMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{registrationMessage}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:outline-none"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:outline-none"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:outline-none"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="repeatPassword" className="block text-gray-700">Repeat Password</label>
                        <input
                            id="repeatPassword"
                            name="repeatPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            className={`w-full px-4 py-2 rounded-lg border ${passwordsMatch ? 'border-gray-300' : 'border-red-500'
                                } focus:ring focus:ring-green-200 focus:outline-none`}
                            placeholder="Repeat Password"
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange}
                        />
                        {!passwordsMatch && (
                            <p className="mt-2 text-sm text-red-500">Passwords do not match.</p>
                        )}
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
