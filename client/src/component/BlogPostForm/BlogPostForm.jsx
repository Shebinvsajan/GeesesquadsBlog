import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../NavBar/Nav';




const BlogPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    imgurl: '',
    postedBy: '',
    description: '',
  });


  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/blog/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successfully saved data to the server
        setSuccessMessage('Data saved successfully');
        setTimeout(() => {
          // Redirect to the home page after 2 seconds
          window.location.href = '/home'; // Replace with the actual URL of your home page
        }, 2000);
      } else {
        // Handle the error, e.g., display an error message
        console.error('Error while saving data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  useEffect(() => {
    // Check if a token exists in localStorage
    if (!localStorage.getItem('token')) {
      // Redirect to the login page or another appropriate page
      navigate('/');
    }
  }, []);

  return (
    
 <>
       <Nav />

      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Create a Blog Post</h1>
          {successMessage && (
            <div className="text-green-500 text-center mb-4">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imgurl" className="block text-gray-700">Image URL</label>
              <input
                type="url"
                id="imgurl"
                name="imgurl"
                value={formData.imgurl}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postedBy" className="block text-gray-700">Posted by</label>
              <input
                type="text"
                id="postedBy"
                name="postedBy"
                value={formData.postedBy}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:outline-none"
                required
                rows="4"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover-bg-green-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
 </>
  );
};

export default BlogPostForm;
