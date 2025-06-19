// src/components/PostBuilder.tsx
import React, { useState } from 'react';

const PostBuilder: React.FC = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setMedia(reader.result as string);
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = () => {
    if (!content && !media) {
      alert('Please add text or upload media before posting.');
      return;
    }

    const newPost = {
      id: Date.now(),
      content,
      media,
      mediaType,
      timestamp: new Date().toISOString(),
    };

    const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    localStorage.setItem('posts', JSON.stringify([newPost, ...existingPosts]));

    // Reset form
    setContent('');
    setMedia(null);
    setMediaType(null);
    alert('Post created!');
  };

  return (
    <div className="post-builder">
      <h3>Create a New Post</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
        rows={3}
      />
      <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} />

      {media && mediaType === 'image' && <img src={media} alt="preview" style={{ maxWidth: '100%' }} />}
      {media && mediaType === 'video' && (
        <video controls style={{ maxWidth: '100%' }}>
          <source src={media} type="video/mp4" />
        </video>
      )}

      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default PostBuilder;
