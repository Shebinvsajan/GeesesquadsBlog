import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/user/login', {
        email,
        password,
      });

      // Handle the response
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store the token in localStorage
        setLoginMessage('Login successful');
        navigate('/home'); // Use navigate to redirect to the home page
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginMessage('Invalid credentials');
      } else {
        setLoginMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Log in to your account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
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
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover-bg-blue-600 transition duration-300"
            >
              Log in
            </button>
          </div>
          {loginMessage && (
            <p className={`text-center ${loginMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
              {loginMessage}
            </p>
          )}
          <div className="text-center">
            <p className="text-gray-600">Don't have an account? <a href="#" className="text-blue-500">Create one</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
