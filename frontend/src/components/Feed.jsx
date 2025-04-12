import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '../styles/styles.css';

dayjs.extend(relativeTime);

const PostCard = ({ post, index, onCommentChange, onCommentSubmit }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
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
            A
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

      {post.image && (
        <div className="mt-3">
          <img
            src={post.image}
            alt="Post Content"
            className="post-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default.jpg";
            }}
          />
        </div>
      )}

      {post.isCommenting && (
        <div className="comment-section mt-3">
          <textarea
            placeholder="Write a comment..."
            value={post.comment}
            className="comment-textarea"
            rows={3}
            onChange={(e) => onCommentChange(post.id, e.target.value)}
          />
          <button
            onClick={() => onCommentSubmit(post)}
            className="comment-button"
          >
            Post
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Feed = ({ posts }) => {
  const [comments, setComments] = useState({});
  const [currentPost, setCurrentPost] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) setShowCommentBox(true);
      else setShowCommentBox(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCommentChange = (postId, comment) => {
    setComments({
      ...comments,
      [postId]: { ...comments[postId], comment },
    });
  };

  const handleCommentSubmit = (post) => {
    // Handle comment submission logic
    console.log("Comment submitted for post: ", post.id);
  };

  return (
    <div className="feed-container">
      <aside className="sidebar-left">
        <div className="sidebar-content">
          <h2 className="sidebar-title">Menu</h2>
          <ul className="sidebar-links">
            <li>Home</li>
            <li>
              <a href="/explore">Explore</a>
            </li>
            <li>Notifications</li>
            <li>Messages</li>
          </ul>
        </div>
      </aside>

      <main className="feed-main">
        <div className="feed-header">
          {showCommentBox && !currentPost ? (
            <div className="new-comment-box mb-4">
              <textarea
                placeholder="Write your comment here..."
                className="comment-textarea"
                rows={3}
              />
              <button
                onClick={() => setCurrentPost(posts[0])}
                className="comment-button"
              >
                Post a Comment
              </button>
            </div>
          ) : (
            <h1 className="feed-title">SombezaPwani</h1>
          )}
        </div>

        <div className="posts-container">
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet.</p>
          ) : (
            posts.map((post, idx) => (
              <PostCard
                key={idx}
                post={{ ...post, comment: comments[post.id]?.comment || '' }}
                index={idx}
                onCommentChange={handleCommentChange}
                onCommentSubmit={handleCommentSubmit}
              />
            ))
          )}
        </div>
      </main>

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
