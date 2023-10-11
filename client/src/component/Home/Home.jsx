import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../BlogCard/BlogCard';
import Nav from '../NavBar/Nav';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await axios.get('/api/blog/all-posts');
        const data = response.data.posts;
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    }

    fetchBlogPosts();
    if (!localStorage.getItem('token'))
    navigate('/')
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Nav />
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Blog Home</h1>
          {blogPosts.length > 0 ? (
            currentPosts.map((post) => (
              <Link key={post._id} to={`/view/${post._id}`}>
                <BlogCard post={post} />
              </Link>
            ))
          ) : (
            <p>No blog posts available.</p>
          )}

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-2 py-1 mx-2 rounded ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
