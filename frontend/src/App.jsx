import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';
import AdminPanel from './components/AdminPanel';
import NavBar from './components/NavBar';
import Explore from './pages/Explore'; // Ensure this import is correct

const App = () => {
  const [posts, setPosts] = useState([]);  // This is where posts will be stored

  // Function to handle creating a new post
  const handleCreatePost = (content) => {
    const newPost = { content };
    setPosts([newPost, ...posts]); // Add new post at the top of the list
  };

  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/admin" element={<AdminPanel onCreatePost={handleCreatePost} />} />
          <Route path="/" element={<Feed posts={posts} />} />
          <Route path="/explore" element={<Explore />} /> {/* Added route for Explore page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
