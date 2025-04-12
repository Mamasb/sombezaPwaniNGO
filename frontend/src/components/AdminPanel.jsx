import React, { useState } from 'react';

const AdminPanel = ({ onCreatePost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() !== '') {
      onCreatePost(content); // Calls the function to add the post to the state in App.jsx
      setContent(''); // Clear the input after posting
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded-md"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
