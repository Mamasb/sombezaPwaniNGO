import { useState, ChangeEvent, FormEvent } from 'react';

type AdminPanelProps = {
  onCreatePost: (content: string, image: File | null) => Promise<void>;
};

const AdminPanel = ({ onCreatePost }: AdminPanelProps) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.trim() === '') {
      setError('Post content cannot be empty');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await onCreatePost(content, image);
      setContent('');
      setImage(null);
    } catch (err) {
      setError('Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded-md"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

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
          disabled={loading}
        >
          {loading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
