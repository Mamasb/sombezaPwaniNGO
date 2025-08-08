// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Feed from './components/Feed';
import Explore from './pages/Explore';
import AdminPanel from './pages/AdminPanel';

interface Post {
  content?: string;
  media?: {
    type: 'image' | 'video';
    src: string;
  };
  timestamp?: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleCreatePost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Feed posts={posts} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/admin" element={<AdminPanel onCreatePost={handleCreatePost} posts={posts} />} />
      </Routes>
    </Router>
  );
};

export default App;
