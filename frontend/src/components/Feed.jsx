import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '../styles/styles.css';
import AnimatedMenuItem from '../components/AnimatedMenuItem';

dayjs.extend(relativeTime);

const PostCard = ({ post, index, onCommentChange, onCommentSubmit }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const direction = index % 2 === 0 ? -150 : 150;

  const media = post.media || (post.image ? { type: 'image', src: post.image } : null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction, rotate: direction / 6 }}
      animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="post-card"
    >
      <div className="flex items-start">
        <div className="w-12 h-12 mr-3">
          <img
            src="/images/admin-avatar.png"
            alt="Admin Avatar"
            className="rounded-full object-cover w-full h-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default-avatar.png";
            }}
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-gray-800">Admin</h4>
            <span className="text-xs text-gray-500">
              {post.timestamp ? dayjs(post.timestamp).fromNow() : 'Just now'}
            </span>
          </div>
          <p className="text-gray-800 text-sm mt-1">{post.content}</p>

          {media && (
            <div className="post-media mt-3">
              {media.type === 'image' ? (
                <img
                  src={media.src}
                  alt="Post Content"
                  className="media-item rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default.jpg";
                  }}
                />
              ) : media.type === 'video' ? (
                <video controls className="media-item rounded-md">
                  <source src={media.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
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
        </div>
      </div>
    </motion.div>
  );
};

const Feed = ({ posts }) => {
  const [comments, setComments] = useState({});
  const [currentPost, setCurrentPost] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowCommentBox(window.scrollY < 100);
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
    console.log("Comment submitted for post: ", post.id);
    // Add real submission logic here
  };

  return (
    <div className="feed-container">
      <aside className="sidebar-left">
        <div className="sidebar-content">
          <h2 className="sidebar-title">Menu</h2>
          <ul className="sidebar-links">
            <AnimatedMenuItem label="Explore" link="/explore" animationKey="explore" />
            <AnimatedMenuItem label="Learning & Impact" animationKey="learn" />
            <AnimatedMenuItem label="Donations and Partnerships" animationKey="donate" />
            <AnimatedMenuItem label="Messages" animationKey="messages" />
            <AnimatedMenuItem label="Careers And Opportunities" animationKey="careers" />
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
                key={post.id || idx}
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
