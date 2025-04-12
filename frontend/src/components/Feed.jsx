// src/components/Feed.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import '../styles/styles.css';  // Assuming styles.css is one level up in a 'styles' directory



const PostCard = ({ post, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  // Alternate the entry direction a bit for a dynamic feel
  const direction = index % 2 === 0 ? -150 : 150;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction, rotate: direction / 6 }}
      animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="post-card"
    >
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            A {/* You can add a profile image here */}
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-gray-800">Admin</h4>
            <span className="text-xs text-gray-500">
              {post.timestamp ? dayjs(post.timestamp).fromNow() : 'Just now'}
            </span>
          </div>
          <p className="text-gray-800 text-sm mt-1">{post.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Feed = ({ posts }) => {
  return (
    <div className="feed-container">
      {/* Left Sidebar */}
      <aside className="sidebar-left">
        <div className="sidebar-content">
          <h2 className="sidebar-title">Menu</h2>
          <ul className="sidebar-links">
            <li>Home</li>
            <li>Explore</li>
            <li>Notifications</li>
            <li>Messages</li>
          </ul>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="feed-main">
        <div className="feed-header">
          <h1 className="feed-title">Home Feed</h1>
        </div>
        <div className="posts-container">
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet.</p>
          ) : (
            posts.map((post, idx) => <PostCard key={idx} post={post} index={idx} />)
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="sidebar-right">
        <div className="sidebar-content">
          <h3 className="sidebar-title">Support Our Platform</h3>
          <p>Your donations help us keep this platform running.</p>
          <button className="btn-donate">Donate Now</button>
        </div>
        <div className="sidebar-content">
          <h3 className="sidebar-title">Advertise With Us</h3>
          <p>Want your brand to be seen? Reach thousands of users.</p>
        </div>
      </aside>
    </div>
  );
};

export default Feed;
