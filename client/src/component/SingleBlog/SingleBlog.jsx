import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../NavBar/Nav';


function SingleBlog() {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const response = await axios.get(`/api/blog/post/${id}`);
        setBlogPost(response.data.post);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    }

    fetchBlogPost();
    if (!localStorage.getItem('token'))
      navigate('/')
  }, [id]);

  if (!blogPost) {
    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-3xl mx-auto">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>      <Nav />

      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-4 flex">
            <div className="flex-shrink-0 mr-4">
              <img src={blogPost.imgurl} alt={blogPost.title} className="w-48 h-auto" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{blogPost.title}</h1>
              <p className="text-gray-500">Posted by {blogPost.postedBy} on {blogPost.date}</p>
              <p className="mt-4">{blogPost.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBlog;
