import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Nav() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      {/* Left side: Logo and text */}
      <div className="flex items-center">
        <span className="text-white text-xl font-bold">Blog</span>
      </div>

      {/* Right side: Home, Logout, and Post Blog links */}
      <div className="space-x-4">
        <a href="/home" className="text-white hover:underline">Home</a>
        <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
        
        {/* Add the "Post Blog" button */}
    <Link to={'/create'}>
          <button className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            Post Blog
          </button>
    </Link>
      </div>
    </nav>
  );
}

export default Nav;
