// src/pages/AdminPanel.tsx
import React from 'react';
import QuestionBuilder from '../components/QuestionBuilder';
import Feed from '../components/Feed';

interface Post {
  content?: string;
  media?: {
    type: 'image' | 'video';
    src: string;
  };
  timestamp?: string;
}

interface AdminPanelProps {
  onCreatePost: (post: Post) => void;
  posts: Post[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onCreatePost, posts }) => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <QuestionBuilder onCreatePost={onCreatePost} />
      <Feed posts={posts} />
    </div>
  );
};

export default AdminPanel;
