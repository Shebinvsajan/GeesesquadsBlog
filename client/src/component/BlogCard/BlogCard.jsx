import React from 'react';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const BlogCard = ({ post }) => {
  const { imgurl, title, description, postedBy } = post;

  // Truncate the description to a maximum of 60 characters
  const truncatedDescription = truncateText(description, 60);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center">
        <div className="w-24 h-24 overflow-hidden">
          <img
            src={imgurl}
            alt="Author"
            className="w-24 h-24 object-cover"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600">{truncatedDescription}</p>
          <p className="text-gray-500 mt-2">Posted by {postedBy}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
