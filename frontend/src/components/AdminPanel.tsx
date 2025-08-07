import React, { useState } from 'react';

const AdminPanel = ({ onCreatePost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      setError('Please select a valid image file');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() === '') {
      setError('Post content cannot be empty');
      return;
    }

    setError(''); // Clear error message
    setLoading(true); // Set loading state

    try {
      await onCreatePost(content, image); // Send content and image to the parent
      setContent(''); // Clear the input after posting
      setImage(null); // Clear the image after posting
    } catch (err) {
      setError('Error creating post. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
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
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error message */}

        <div>
          <label className="block mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
          {image && (
            <div className="mt-2">
              <p className="text-green-500">Image Selected: {image.name}</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="mt-2 max-w-full h-auto"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
